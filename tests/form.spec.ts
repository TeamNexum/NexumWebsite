import { expect, test, type Page, type Route } from '@playwright/test';
import { B, FORM_ENDPOINT, formFields } from './helpers';

const CORS = { 'access-control-allow-origin': '*' };
const json = (route: Route, status: number, body: unknown) =>
  route.fulfill({ status, headers: CORS, contentType: 'application/json', body: JSON.stringify(body) });

/** Intercepte le point d'accès du formulaire : les envois sont comptés et lus, jamais envoyés. */
async function spy(page: Page, reply: (route: Route) => Promise<void> = (r) => json(r, 200, { ok: true })) {
  const calls: Record<string, string>[] = [];
  await page.route(`${FORM_ENDPOINT}`, async (route) => {
    calls.push(formFields(route.request()));
    await reply(route);
  });
  return calls;
}

const form = (page: Page) => page.locator('form[data-waitlist]');

/** Coche une case comme le ferait un visiteur : l'<input> est transparent mais posé sur le carré visible, c'est lui qui reçoit le clic. */
async function tick(page: Page, name: string) {
  await form(page).locator(`input[name=${name}]`).check();
}

async function fill(page: Page, email = 'ada@example.com', consent = true) {
  await form(page).locator('input[name=email]').fill(email);
  if (consent) await tick(page, 'consentement');
}

test.describe('beta form', () => {
  test('flags an empty or invalid email and sends nothing', async ({ page }) => {
    const calls = await spy(page);
    await page.goto(`${B}/`);
    const email = form(page).locator('input[name=email]');

    await form(page).locator('button[type=submit]').click();
    await expect(form(page).locator('[data-err=email]')).toBeVisible();
    await expect(email).toHaveAttribute('aria-invalid', 'true');

    await email.fill('not-an-email');
    await form(page).locator('button[type=submit]').click();
    await expect(form(page).locator('[data-err=email]')).toBeVisible();

    // L'erreur disparaît dès que l'adresse est corrigée.
    await email.fill('ada@example.com');
    await expect(form(page).locator('[data-err=email]')).toBeHidden();
    expect(calls).toHaveLength(0);
  });

  test('requires the consent box', async ({ page }) => {
    const calls = await spy(page);
    await page.goto(`${B}/`);
    await fill(page, 'ada@example.com', false);
    await form(page).locator('button[type=submit]').click();
    await expect(form(page).locator('[data-err=consent]')).toBeVisible();
    expect(calls).toHaveLength(0);
  });

  test('sends the answers and shows the confirmation', async ({ page }) => {
    const calls = await spy(page);
    await page.goto(`${B}/for/gamers?utm_source=tiktok&utm_campaign=launch`);
    await fill(page);
    await form(page).locator('textarea[name=agacement]').fill('I reopen the same apps every day');
    await tick(page, 'entretien');
    await form(page).locator('button[type=submit]').click();

    await expect(form(page).locator('[data-done]')).toBeVisible();
    await expect(form(page).locator('[data-fields]')).toBeHidden();
    expect(calls).toHaveLength(1);
    expect(calls[0]).toMatchObject({
      email: 'ada@example.com',
      profil: 'joueurs',
      segment: 'joueurs',
      lang: 'en',
      entretien: 'oui',
      consentement: 'oui',
      agacement: 'I reopen the same apps every day',
      utm_source: 'tiktok',
      utm_campaign: 'launch',
      page: `${B}/for/gamers`,
    });
  });

  test('the home page reports its own origin, in French too', async ({ page }) => {
    const calls = await spy(page);
    await page.goto(`${B}/fr/`);
    await form(page).locator('button[type=submit]').click();
    await expect(form(page).locator('[data-err=email]')).toHaveText('Vérifiez votre adresse e-mail.');
    await fill(page);
    await form(page).locator('button[type=submit]').click();
    await expect(form(page).locator('[data-done] h3')).toHaveText('Vous êtes sur la liste.');
    expect(calls[0]).toMatchObject({ segment: 'accueil', lang: 'fr' });
  });

  test('shows the service refusal (422) on the email field', async ({ page }) => {
    await spy(page, (r) => json(r, 422, { errors: [{ field: 'email' }] }));
    await page.goto(`${B}/`);
    await fill(page);
    await form(page).locator('button[type=submit]').click();
    await expect(form(page).locator('[data-err=email]')).toBeVisible();
    await expect(form(page).locator('[data-done]')).toBeHidden();
  });

  test('keeps the form and shows an error when the service fails', async ({ page }) => {
    await spy(page, (r) => json(r, 500, { error: 'boom' }));
    await page.goto(`${B}/`);
    await fill(page);
    const submit = form(page).locator('button[type=submit]');
    await submit.click();
    await expect(form(page).locator('[data-status]')).toHaveAttribute('data-kind', 'err');
    await expect(form(page).locator('[data-status]')).toHaveText('Sending failed. Try again in a moment.');
    await expect(submit).toBeEnabled();
    await expect(form(page).locator('input[name=email]')).toHaveValue('ada@example.com');
  });

  test('keeps the form when the service says ok:false', async ({ page }) => {
    await spy(page, (r) => json(r, 200, { ok: false }));
    await page.goto(`${B}/`);
    await fill(page);
    await form(page).locator('button[type=submit]').click();
    await expect(form(page).locator('[data-status]')).toHaveAttribute('data-kind', 'err');
    await expect(form(page).locator('[data-done]')).toBeHidden();
  });

  test('ignores a second click while sending', async ({ page }) => {
    const calls = await spy(page, async (r) => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      await json(r, 200, { ok: true });
    });
    await page.goto(`${B}/`);
    await fill(page);
    const submit = form(page).locator('button[type=submit]');
    await submit.click();
    await form(page).evaluate((f: HTMLFormElement) => f.requestSubmit());
    await expect(form(page).locator('[data-done]')).toBeVisible();
    expect(calls).toHaveLength(1);
  });

  test('a filled honeypot looks like a success but sends nothing', async ({ page }) => {
    const calls = await spy(page);
    await page.goto(`${B}/`);
    await fill(page);
    await form(page).locator('input[name=_gotcha]').fill('spam', { force: true });
    await form(page).locator('button[type=submit]').click();
    await expect(form(page).locator('[data-done]')).toBeVisible();
    expect(calls).toHaveLength(0);
  });
});

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { B, PAGES } from './helpers';

test.describe('pages', () => {
  for (const { path, lang } of PAGES) {
    test(`${path} : language, one h1, no horizontal scroll`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('h1')).toHaveCount(1);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test(`${path} : no accessibility violations`, async ({ page }) => {
      // Sans animation : les éléments « à révéler » sont déjà visibles, le contraste se mesure sur le rendu final.
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([]);
    });
  }

  test('old French addresses redirect to /fr/', async ({ page }) => {
    await page.goto(`${B}/pour/joueurs`);
    await page.waitForURL(/\/fr\/pour\/joueurs$/);
    await page.goto(`${B}/confidentialite`);
    await page.waitForURL(/\/fr\/confidentialite$/);
  });

  test('home page declares both languages and a per-page preview image', async ({ page }) => {
    await page.goto(`${B}/for/streamers`);
    const alt = await page.locator('link[rel=alternate][hreflang]').evaluateAll((els) => els.map((e) => `${e.getAttribute('hreflang')} ${e.getAttribute('href')}`));
    expect(alt).toEqual([
      'en https://teamnexum.github.io/NexumWebsite/for/streamers',
      'fr https://teamnexum.github.io/NexumWebsite/fr/pour/streamers',
      'x-default https://teamnexum.github.io/NexumWebsite/for/streamers',
    ]);
    const og = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(og).toBe('https://teamnexum.github.io/NexumWebsite/og/streamers-en.jpeg');
    const res = await page.request.get(og!.replace('https://teamnexum.github.io', ''));
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('image/jpeg');
  });
});

test.describe('language', () => {
  test('English is the default, the switcher moves to French and remembers the choice', async ({ page }) => {
    await page.goto(`${B}/`);
    await expect(page.locator('h1')).toContainText('One click.');
    await page.locator('.top .lang a[data-lang=fr]').click();
    await expect(page).toHaveURL(`${B}/fr/`);
    await expect(page.locator('h1')).toContainText('Un clic.');
    expect(await page.evaluate(() => localStorage.getItem('nexum-lang'))).toBe('fr');

    // Revenir à la racine renvoie vers le français tant que le choix est gardé.
    await page.goto(`${B}/`);
    await page.waitForURL(`${B}/fr/`);

    await page.locator('.top .lang a[data-lang=en]').click();
    await expect(page).toHaveURL(`${B}/`);
    await page.goto(`${B}/`);
    await expect(page).toHaveURL(`${B}/`);
  });
});

test.describe('header', () => {
  test('the beta button on a segment page leads to that page’s own form', async ({ page }) => {
    await page.goto(`${B}/for/gamers`);
    await expect(page.locator('.top a.cta')).toHaveAttribute('href', '#beta');
  });
});

test.describe('scroll reveal', () => {
  test('sections appear when scrolled to, and everything shows with reduced motion', async ({ page }) => {
    await page.goto(`${B}/`);
    const faq = page.locator('#faq .qa');
    await expect(page.locator('html')).toHaveClass(/rv/);
    await expect(faq).not.toHaveClass(/\bin\b/);
    await faq.scrollIntoViewIfNeeded();
    await expect(faq).toHaveClass(/\bin\b/);
  });

  test('nothing is hidden with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`${B}/`);
    await expect(page.locator('html')).not.toHaveClass(/rv/);
    await expect(page.locator('#faq .qa')).toHaveCSS('opacity', '1');
  });
});

test.describe('mobile call to action', () => {
  test('a bar appears after the hero and gives way to the form', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'La barre n’existe que sur petit écran.');
    await page.goto(`${B}/`);
    const bar = page.locator('[data-cta-bar]');
    await expect(bar).toBeHidden();
    await page.locator('#how-it-works').scrollIntoViewIfNeeded();
    await expect(bar).toBeVisible();
    await page.locator('#beta').scrollIntoViewIfNeeded();
    await expect(bar).toBeHidden();
  });

  test('is not shown on large screens', async ({ page, isMobile }) => {
    test.skip(!!isMobile);
    await page.goto(`${B}/`);
    await page.locator('#how-it-works').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-cta-bar]')).toBeHidden();
  });
});

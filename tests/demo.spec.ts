import { expect, test } from '@playwright/test';
import { B } from './helpers';

test.describe('mode demo', () => {
  test('digit keys pick a profile', async ({ page }) => {
    await page.goto(`${B}/`);
    const name = page.locator('[data-name]');
    await expect(name).toHaveText('Gaming');
    await page.locator('.cd').first().focus();
    await page.keyboard.press('3');
    await expect(name).toHaveText('Work');
    await expect(page.locator('.cd[aria-pressed=true]')).toContainText('Work');
  });

  test('Enter activates the profile at once and the chain runs to the end', async ({ page }) => {
    await page.goto(`${B}/`);
    const go = page.locator('[data-go]');
    await go.focus();
    await page.keyboard.press('Enter');
    await expect(go).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-log] .ln .tx').filter({ hasText: /Gaming active · 5 actions/ })).toBeVisible();
    await expect(page.locator('.pipe li.on')).toHaveCount(6); // départ + 5 actions
  });

  test('the simulated failure shows on the lighting step', async ({ page }) => {
    await page.goto(`${B}/`);
    await page.locator('.failchk').click();
    await page.locator('[data-go]').focus();
    await page.keyboard.press('Space');
    await expect(page.locator('.pipe li.fail')).toHaveCount(1);
    await expect(page.locator('.pipe li.fail')).toContainText('Lighting');
    await expect(page.locator('[data-log]')).toContainText('4 of 5 actions');
  });

  test('a segment page opens on its own profile', async ({ page }) => {
    await page.goto(`${B}/for/streamers`);
    await expect(page.locator('[data-name]')).toHaveText('Stream');
  });

  test('sound is off by default and the choice is kept', async ({ page }) => {
    await page.goto(`${B}/`);
    const snd = page.locator('[data-sound]');
    await expect(snd).toHaveAttribute('aria-pressed', 'false');
    await snd.click();
    await expect(snd).toHaveAttribute('aria-pressed', 'true');
    expect(await page.evaluate(() => localStorage.getItem('nexum-sound'))).toBe('on');
    await page.reload();
    await expect(page.locator('[data-sound]')).toHaveAttribute('aria-pressed', 'true');
    await page.locator('[data-sound]').click();
    await expect(page.locator('[data-sound]')).toHaveAttribute('aria-pressed', 'false');
  });

  test('plays no sound when it is off', async ({ page }) => {
    // Compte les oscillateurs créés : zéro tant que le son est coupé, des notes une fois activé.
    await page.addInitScript(() => {
      const w = window as unknown as { __osc: number; AudioContext: typeof AudioContext };
      w.__osc = 0;
      const create = AudioContext.prototype.createOscillator;
      AudioContext.prototype.createOscillator = function (this: AudioContext) {
        w.__osc++;
        return create.call(this);
      };
    });
    await page.goto(`${B}/`);
    await page.locator('[data-go]').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-go]')).toHaveAttribute('aria-pressed', 'true');
    await page.waitForTimeout(1900);
    expect(await page.evaluate(() => (window as unknown as { __osc: number }).__osc)).toBe(0);

    await page.locator('[data-sound]').click();
    await page.locator('.cd').nth(1).click();
    await page.locator('[data-go]').focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1900);
    expect(await page.evaluate(() => (window as unknown as { __osc: number }).__osc)).toBeGreaterThan(5);
  });
});

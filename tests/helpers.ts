import type { Request } from '@playwright/test';

export const B = '/NexumWebsite';

/** Faux point d'accès du formulaire, injecté au build des tests (voir playwright.config.ts). */
export const FORM_ENDPOINT = 'https://forms.test/f/nexum';

/** Toutes les pages du site, avec leur langue. */
export const PAGES = [
  { path: `${B}/`, lang: 'en' },
  { path: `${B}/for/gamers`, lang: 'en' },
  { path: `${B}/for/streamers`, lang: 'en' },
  { path: `${B}/for/remote-work`, lang: 'en' },
  { path: `${B}/privacy`, lang: 'en' },
  { path: `${B}/fr/`, lang: 'fr' },
  { path: `${B}/fr/pour/joueurs`, lang: 'fr' },
  { path: `${B}/fr/pour/streamers`, lang: 'fr' },
  { path: `${B}/fr/pour/teletravail`, lang: 'fr' },
  { path: `${B}/fr/confidentialite`, lang: 'fr' },
] as const;

/** Champs d'un envoi multipart (FormData), tels que le service de formulaire les recevrait. */
export function formFields(req: Request): Record<string, string> {
  const type = req.headers()['content-type'] ?? '';
  const boundary = /boundary=(.+)$/.exec(type)?.[1];
  const raw = req.postData() ?? '';
  const out: Record<string, string> = {};
  if (!boundary) return out;
  for (const part of raw.split(`--${boundary}`)) {
    const m = /name="([^"]+)"\r?\n\r?\n([\s\S]*?)\r?\n$/.exec(part);
    if (m) out[m[1]!] = m[2]!;
  }
  return out;
}

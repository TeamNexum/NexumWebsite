// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages sert le site sous /NexumWebsite/ tant qu'aucun domaine n'est branché.
// Avec un domaine perso : SITE_URL=https://nexum.example BASE_PATH=/ npm run build
const site = process.env.SITE_URL ?? 'https://teamnexum.github.io';
const base = process.env.BASE_PATH ?? '/NexumWebsite';

export default defineConfig({
  site,
  base,
  // Les tests (npm test) construisent le site ailleurs que dans dist/, avec un faux point d'accès pour le formulaire.
  outDir: process.env.OUT_DIR ?? 'dist',
  trailingSlash: 'ignore',
  // L'anglais est à la racine, le français sous /fr/.
  // Les anciennes adresses (site d'abord uniquement en français) redirigent vers leur équivalent français.
  // (Astro préfixe les sources avec `base`, pas les destinations : on l'ajoute ici.)
  redirects: Object.fromEntries(
    ['pour/joueurs', 'pour/streamers', 'pour/teletravail', 'confidentialite'].map((page) => [`/${page}`, `${base.replace(/\/$/, '')}/fr/${page}`]),
  ),
  integrations: [sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', fr: 'fr' } } })],
});

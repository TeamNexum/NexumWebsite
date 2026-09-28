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
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});

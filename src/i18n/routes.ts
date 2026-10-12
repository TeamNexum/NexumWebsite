// Adresses des pages, par langue. L'anglais est à la racine, le français sous /fr/.
import { url } from '../data/url';
import type { SegmentSlug } from '../data/site';
import type { Lang } from './index';

const prefix = (lang: Lang) => (lang === 'en' ? '' : 'fr/');

const segmentDir: Record<Lang, string> = { en: 'for', fr: 'pour' };
const privacyDir: Record<Lang, string> = { en: 'privacy', fr: 'confidentialite' };

/** Le `slug` du segment (joueurs, streamers, teletravail) reste la valeur du formulaire ; seule l'adresse change. */
export const segmentSlugs: Record<Lang, Record<SegmentSlug, string>> = {
  en: { joueurs: 'gamers', streamers: 'streamers', teletravail: 'remote-work' },
  fr: { joueurs: 'joueurs', streamers: 'streamers', teletravail: 'teletravail' },
};

export const paths = {
  home: (lang: Lang) => url(lang === 'en' ? '' : 'fr/'),
  section: (lang: Lang, id: string) => url(`${prefix(lang)}#${id}`),
  segment: (lang: Lang, slug: SegmentSlug) => url(`${prefix(lang)}${segmentDir[lang]}/${segmentSlugs[lang][slug]}`),
  privacy: (lang: Lang) => url(`${prefix(lang)}${privacyDir[lang]}`),
};

/** Les deux adresses d'une même page, pour le sélecteur de langue et les balises hreflang. */
export type Alt = Record<Lang, string>;

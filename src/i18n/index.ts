import { en, type Dict } from './en';
import { fr } from './fr';

export type Lang = 'en' | 'fr';
export const langs: Lang[] = ['en', 'fr'];
/** Langue principale : l'anglais, servi à la racine du site (le français est sous /fr/). */
export const defaultLang: Lang = 'en';
export const dict: Record<Lang, Dict> = { en, fr };

/** Remplace les `{clé}` d'un texte : fmt('{n} actions', { n: 5 }) → '5 actions'. */
export function fmt(text: string, vars: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`));
}

/** « Arnaud, Rares, Raphaël, Max et Enzo » / « Arnaud, Rares, Raphaël, Max and Enzo ». */
export function joinNames(lang: Lang, names: string[]): string {
  return `${names.slice(0, -1).join(', ')} ${dict[lang].and} ${names.at(-1)}`;
}

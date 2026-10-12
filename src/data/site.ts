// Données structurelles du site, indépendantes de la langue (teintes, icônes, ordre des étapes).
// Tous les textes affichés sont dans src/i18n/{en,fr}.ts.
// Règle de contenu : ne marquer « disponible » que ce qui marche vraiment dans le prototype
// (Nexum/crates/nexum-schema/src/action_types.rs).
import type { IconName, Kind } from './icons';
import type { Lang } from '../i18n';
import { dict } from '../i18n';

export const site = {
  name: 'Nexum',
  github: 'https://github.com/TeamNexum',
};

// Équipe telle que présentée dans la direction artistique « Galaxie ».
export const team = ['Arnaud', 'Rares', 'Raphaël', 'Max', 'Enzo'];

export { url } from './url';

export type Tint = [number, number, number];

export type Step = { kind: Kind; label: string; detail: string; value: string };
export type DemoMode = {
  id: ModeId;
  name: string;
  icon: IconName;
  tint: Tint;
  desc: string;
  trigger: string;
  steps: Step[];
};

export type ModeId = 'game' | 'stream' | 'work' | 'chill';

// Teintes : une par profil, reprises du guide de marque (Gaming, Studio Streamer, Work, Chill).
const modeBase: { id: ModeId; icon: IconName; tint: Tint; kinds: Kind[] }[] = [
  { id: 'game', icon: 'game', tint: [150, 90, 255], kinds: ['apps', 'audio', 'screen', 'lighting', 'launch'] },
  { id: 'stream', icon: 'cam', tint: [255, 100, 200], kinds: ['apps', 'music', 'lighting', 'link', 'status'] },
  { id: 'work', icon: 'case', tint: [255, 235, 200], kinds: ['apps', 'apps', 'lighting', 'audio'] },
  { id: 'chill', icon: 'head', tint: [255, 150, 90], kinds: ['apps', 'lighting', 'music', 'screen'] },
];

/** Les profils de démonstration, dans la langue demandée. */
export function getModes(lang: Lang): DemoMode[] {
  const copy = dict[lang].modes;
  return modeBase.map((m) => ({
    id: m.id,
    icon: m.icon,
    tint: m.tint,
    name: copy[m.id].name,
    desc: copy[m.id].desc,
    trigger: copy[m.id].trigger,
    steps: m.kinds.map((kind, i) => ({ kind, ...copy[m.id].steps[i]! })),
  }));
}

export type SegmentSlug = 'joueurs' | 'streamers' | 'teletravail';

/** `slug` sert aussi de valeur « segment » du formulaire : il ne change pas avec la langue, pour comparer les cibles. */
export const segmentBase: { slug: SegmentSlug; mode: ModeId }[] = [
  { slug: 'joueurs', mode: 'game' },
  { slug: 'streamers', mode: 'stream' },
  { slug: 'teletravail', mode: 'work' },
];

export type Segment = {
  slug: SegmentSlug;
  mode: ModeId;
  label: string;
  metaTitle: string;
  title: string;
  lead: string;
  pains: { title: string; text: string }[];
};

export function getSegments(lang: Lang): Segment[] {
  const copy = dict[lang].segments;
  return segmentBase.map((s) => ({ ...s, ...copy[s.slug] }));
}

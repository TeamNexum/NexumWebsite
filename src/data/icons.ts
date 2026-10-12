// Icônes de la charte : contours de 1,5 px, extrémités carrées, angles vifs, grille 24 × 24.
// Elles sont dessinées pour être blanches sur noir (voir src/styles/global.css, `svg.i`).
// Les clés sont neutres (indépendantes de la langue) : les noms affichés viennent de src/i18n.
export const icons = {
  // profils
  game: '<path d="M3 8h18v9H3z"/><path d="M8 11v3M6.5 12.5h3M15 11.5h.01M17 13.5h.01"/>',
  case: '<path d="M3 7h18v12H3zM9 7V5h6v2M3 12h18"/>',
  head: '<path d="M4 15v-3a8 8 0 0116 0v3"/><path d="M3 14h4v6H3zM17 14h4v6h-4z"/>',
  spark: '<path d="M12 3l2 6 6 3-6 3-2 6-2-6-6-3 6-3z"/>',
  cam: '<path d="M3 7h13v10H3zM16 11l5-3v8l-5-3"/>',
  // types d'actions
  audio: '<path d="M4 10v4h4l5 4V6L8 10zM16 9a4 4 0 010 6"/>',
  screen: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/>',
  lighting: '<path d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5V15h8v-1.5A6 6 0 0012 3z"/>',
  apps: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
  launch: '<circle cx="12" cy="12" r="8"/><path d="M8 13l3 1 3-4"/>',
  link: '<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c3 3 3 13 0 16M12 4c-3 3-3 13 0 16"/>',
  music: '<path d="M4 15v-3a8 8 0 0116 0v3"/><path d="M3 14h4v6H3zM17 14h4v6h-4z"/>',
  status: '<path d="M5 6v12M12 6v12M19 6v12M3 10h4M10 14h4M17 9h4"/>',
} as const;

export type IconName = keyof typeof icons;
/** Les types d'action : chacun a une icône du même nom et un nom affiché par langue. */
export type Kind = 'audio' | 'screen' | 'lighting' | 'apps' | 'launch' | 'link' | 'music' | 'status';

// Contenu partagé du site. Règle : ne marquer « disponible » que ce qui marche
// vraiment dans le prototype (Nexum/crates/nexum-schema/src/action_types.rs).

export const site = {
  name: 'Nexum',
  tagline: 'Jouer, streamer ou chiller sans friction.',
  description:
    "Nexum relie tes jeux, ton son, tes lumières et tes applis. Tu choisis un mode, Nexum prépare tout ton setup en un clic, quelle que soit la marque.",
  stage: 'En développement · bêta prévue en 2027',
  github: 'https://github.com/TeamNexum',
};

/** Préfixe un chemin interne avec la base du site (GitHub Pages sert sous /NexumWebsite/). */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export type Step = { label: string; detail: string };
/** `burst` : les 4 étiquettes courtes affichées autour du N dans le visuel « galaxie ». */
export type DemoMode = { id: string; name: string; trigger: string; burst: string[]; steps: Step[] };

export const demoModes: DemoMode[] = [
  {
    id: 'jeu',
    name: 'Gaming',
    trigger: 'Un clic, ou quand Steam lance une partie',
    burst: ['Volume 70 %', 'Lumières', 'Steam', 'Applis fermées'],
    steps: [
      { label: 'Fermer les applis inutiles', detail: 'Navigateur, launcher de mise à jour' },
      { label: 'Régler le son', detail: 'Volume à 70 %' },
      { label: 'Baisser la luminosité', detail: 'Écran à 60 %' },
      { label: 'Ambiance lumineuse', detail: 'Philips Hue · scène « Arène »' },
      { label: 'Lancer la partie', detail: 'Steam · Counter-Strike 2' },
    ],
  },
  {
    id: 'stream',
    name: 'Stream',
    trigger: 'Un clic, ou un raccourci clavier',
    burst: ['OBS', 'Musique', 'Face cam', 'Ne pas déranger'],
    steps: [
      { label: 'Ouvrir OBS', detail: 'Scène « Direct »' },
      { label: 'Lancer la musique', detail: 'Playlist « Stream »' },
      { label: 'Éclairer le visage', detail: 'Philips Hue · scène « Face cam »' },
      { label: 'Ouvrir le chat', detail: 'twitch.tv/popout/chat' },
      { label: 'Passer Discord en occupé', detail: 'Statut « Ne pas déranger »' },
    ],
  },
  {
    id: 'travail',
    name: 'Travail',
    trigger: 'Tous les jours à 9 h',
    burst: ['VS Code', 'Slack', 'Concentration', 'Volume 40 %'],
    steps: [
      { label: 'Ouvrir tes outils', detail: 'VS Code, Slack, agenda' },
      { label: 'Couper les distractions', detail: 'Fermer Steam et Discord' },
      { label: 'Lumière de bureau', detail: 'Philips Hue · scène « Concentration »' },
      { label: 'Régler le son', detail: 'Volume à 40 %' },
    ],
  },
  {
    id: 'chill',
    name: 'Chill',
    trigger: 'Automatiquement après 18 h',
    burst: ['Musique', 'Lumière tamisée', 'Écran 40 %', 'Slack fermé'],
    steps: [
      { label: 'Fermer le travail', detail: 'Slack, VS Code' },
      { label: 'Lumière tamisée', detail: 'Philips Hue · scène « Détente »' },
      { label: 'Lancer la musique', detail: 'Playlist « Soirée »' },
      { label: 'Adoucir l’écran', detail: 'Luminosité à 40 %' },
    ],
  },
];

export const integrationsAvailable = [
  'Lancer et fermer des applications',
  'Ouvrir un site ou un lien',
  'Volume du son',
  'Luminosité de l’écran',
  'Steam',
  'Epic Games',
  'GOG',
  'Philips Hue',
];

export const integrationsPlanned = [
  'Commande vocale',
  'Spotify',
  'Discord',
  'OBS Studio',
  'Govee',
  'Nanoleaf',
  'Home Assistant',
  'Google Agenda',
  'Outlook',
  'Slack',
  'Teams',
  'Extensions de la communauté',
];

export type Segment = {
  slug: 'joueurs' | 'streamers' | 'teletravail';
  label: string;
  title: string;
  lead: string;
  pains: { title: string; text: string }[];
  mode: DemoMode['id'];
};

export const segments: Segment[] = [
  {
    slug: 'joueurs',
    label: 'Joueurs',
    title: 'Ta partie commence avant le chargement.',
    lead: 'Un clic sur « Gaming » : les applis inutiles se ferment, le son et les lumières se règlent, la partie se lance. Steam, Epic ou GOG, peu importe.',
    pains: [
      {
        title: 'Trois launchers, trois logiciels de périphériques',
        text: 'Chaque marque a son appli. Nexum les pilote toutes depuis le même mode.',
      },
      {
        title: 'Des réglages à refaire à chaque session',
        text: 'Son, luminosité, lumières, applis en fond : tu les règles une fois dans un mode.',
      },
      {
        title: 'Rien à coder',
        text: 'Pas de script AutoHotkey. Tu choisis des actions dans une liste.',
      },
    ],
    mode: 'jeu',
  },
  {
    slug: 'streamers',
    label: 'Streamers',
    title: 'Lance ton direct en un clic.',
    lead: 'OBS, musique, lumières, chat, statut Discord : ton mode « Stream » prépare tout pendant que tu t’installes.',
    pains: [
      {
        title: 'Une checklist avant chaque live',
        text: 'Scène, lumière, musique, chat… Nexum déroule la liste pour toi, dans le bon ordre.',
      },
      {
        title: 'Un oubli se voit en direct',
        text: 'Chaque étape renvoie un résultat. Si une action échoue, tu le vois avant de lancer.',
      },
      {
        title: 'Retour à la normale',
        text: 'Quand tu coupes le live, Nexum peut remettre ton setup comme avant.',
      },
    ],
    mode: 'stream',
  },
  {
    slug: 'teletravail',
    label: 'Télétravail',
    title: 'Le même PC, deux vies bien séparées.',
    lead: 'Ton mode « Travail » ouvre tes outils le matin. Ton mode « Chill » les ferme le soir et tamise la lumière. Sans y penser.',
    pains: [
      {
        title: 'Le travail déborde sur la soirée',
        text: 'Slack reste ouvert, les notifications continuent. Un mode ferme tout à l’heure choisie.',
      },
      {
        title: 'Préparer chaque réunion',
        text: 'Ouvrir le lien, vérifier le micro, couper les distractions : un seul déclencheur (prévu).',
      },
      {
        title: 'Aucune compétence technique',
        text: 'Tu composes tes modes dans l’interface, sans script ni configuration compliquée.',
      },
    ],
    mode: 'travail',
  },
];

// Équipe telle que présentée dans la direction artistique « Galaxie ».
export const team = ['Arnaud', 'Rares', 'Raphaël', 'Max', 'Enzo'];

export const faq = [
  {
    q: 'Nexum est-il disponible ?',
    a: 'Pas encore. Nexum est un projet étudiant en développement (EIP Epitech). Un prototype tourne déjà sur ordinateur ; une bêta fermée est prévue en 2027 pour les inscrits.',
  },
  {
    q: 'Combien ça coûtera ?',
    a: 'La bêta sera gratuite. Nous prévoyons une version gratuite pour l’usage de base et une offre payante pour les fonctions avancées et le cloud. Les prix ne sont pas fixés : nous les testons avec vous.',
  },
  {
    q: 'Sur quels systèmes ?',
    a: 'Nexum est une application de bureau pour Windows, macOS et Linux. Une appli mobile pour lancer tes modes à distance est prévue.',
  },
  {
    q: 'Est-ce compatible avec les anti-cheats ?',
    a: 'Nexum ne touche pas aux jeux : il les lance et règle ce qu’il y a autour (son, lumières, applis). Il n’injecte rien dans un processus de jeu.',
  },
  {
    q: 'Que faites-vous de mes données ?',
    a: 'Tes modes sont stockés sur ta machine. Si tu t’inscris à la bêta, nous gardons ton e-mail et tes réponses uniquement pour te recontacter. Détails dans la page confidentialité.',
  },
];

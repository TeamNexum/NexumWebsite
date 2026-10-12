// Contenu partagé du site. Règle : ne marquer « disponible » que ce qui marche
// vraiment dans le prototype (Nexum/crates/nexum-schema/src/action_types.rs).
// Ton (guide de marque) : vouvoiement, peu de mots, aucune exclamation, aucun emoji.
import type { IconName } from './icons';

export const site = {
  name: 'Nexum',
  tagline: 'Jouer, streamer ou se détendre, sans friction.',
  description:
    'Nexum relie vos jeux, votre son, vos lumières et vos applis. Vous choisissez un mode, Nexum prépare tout votre setup en un clic, quelle que soit la marque.',
  stage: 'En développement · bêta en 2027',
  github: 'https://github.com/TeamNexum',
};

/** Préfixe un chemin interne avec la base du site (GitHub Pages sert sous /NexumWebsite/). */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export type Tint = [number, number, number];

/** `kind` choisit l'icône ; `value` est la valeur courte affichée sur la plaque de la constellation. */
export type Step = { kind: IconName; label: string; detail: string; value: string };
export type DemoMode = {
  id: string;
  name: string;
  icon: IconName;
  tint: Tint;
  desc: string;
  trigger: string;
  steps: Step[];
};

// Teintes : une par profil, reprises du guide de marque (Gaming, Studio Streamer, Work, Chill).
export const demoModes: DemoMode[] = [
  {
    id: 'jeu',
    name: 'Gaming',
    icon: 'game',
    tint: [150, 90, 255],
    desc: 'Le son, les lumières et la partie, prêts ensemble',
    trigger: 'Un clic, ou quand Steam lance une partie',
    steps: [
      { kind: 'Applis', label: 'Fermer les applis inutiles', detail: 'Navigateur, launcher de mise à jour', value: 'Fermées' },
      { kind: 'Audio', label: 'Régler le son', detail: 'Volume à 70 %', value: '70 %' },
      { kind: 'Écran', label: 'Baisser la luminosité', detail: 'Écran à 60 %', value: '60 %' },
      { kind: 'Éclairage', label: 'Ambiance lumineuse', detail: 'Philips Hue · scène « Arène »', value: 'Arène' },
      { kind: 'Jeux', label: 'Lancer la partie', detail: 'Steam · Counter-Strike 2', value: 'Steam' },
    ],
  },
  {
    id: 'stream',
    name: 'Stream',
    icon: 'cam',
    tint: [255, 100, 200],
    desc: 'Scène, musique et lumière prêtes à diffuser',
    trigger: 'Un clic, ou un raccourci clavier',
    steps: [
      { kind: 'Applis', label: 'Ouvrir OBS', detail: 'Scène « Direct »', value: 'OBS' },
      { kind: 'Musique', label: 'Lancer la musique', detail: 'Playlist « Stream »', value: 'Stream' },
      { kind: 'Éclairage', label: 'Éclairer le visage', detail: 'Philips Hue · scène « Face cam »', value: 'Face cam' },
      { kind: 'Lien', label: 'Ouvrir le chat', detail: 'twitch.tv/popout/chat', value: 'twitch.tv' },
      { kind: 'Statut', label: 'Passer Discord en occupé', detail: 'Statut « Ne pas déranger »', value: 'Occupé' },
    ],
  },
  {
    id: 'travail',
    name: 'Travail',
    icon: 'case',
    tint: [255, 235, 200],
    desc: 'Calme, lumineux, prêt pour la journée',
    trigger: 'Tous les jours à 9 h',
    steps: [
      { kind: 'Applis', label: 'Ouvrir vos outils', detail: 'VS Code, Slack, agenda', value: 'VS Code' },
      { kind: 'Applis', label: 'Couper les distractions', detail: 'Fermer Steam et Discord', value: 'Fermées' },
      { kind: 'Éclairage', label: 'Lumière de bureau', detail: 'Philips Hue · scène « Concentration »', value: 'Concentration' },
      { kind: 'Audio', label: 'Régler le son', detail: 'Volume à 40 %', value: '40 %' },
    ],
  },
  {
    id: 'chill',
    name: 'Chill',
    icon: 'head',
    tint: [255, 150, 90],
    desc: 'Ambiance douce et musique',
    trigger: 'Automatiquement après 18 h',
    steps: [
      { kind: 'Applis', label: 'Fermer le travail', detail: 'Slack, VS Code', value: 'Fermées' },
      { kind: 'Éclairage', label: 'Lumière tamisée', detail: 'Philips Hue · scène « Détente »', value: 'Détente' },
      { kind: 'Musique', label: 'Lancer la musique', detail: 'Playlist « Soirée »', value: 'Soirée' },
      { kind: 'Écran', label: 'Adoucir l’écran', detail: 'Luminosité à 40 %', value: '40 %' },
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
    title: 'Votre partie commence avant le chargement.',
    lead: 'Un clic sur « Gaming » : les applis inutiles se ferment, le son et les lumières se règlent, la partie se lance. Steam, Epic ou GOG, peu importe.',
    pains: [
      {
        title: 'Trois launchers, trois logiciels',
        text: 'Chaque marque a son appli. Nexum les pilote toutes depuis le même mode.',
      },
      {
        title: 'Des réglages à refaire',
        text: 'Son, luminosité, lumières, applis en fond : vous les réglez une fois, dans un mode.',
      },
      {
        title: 'Rien à coder',
        text: 'Pas de script AutoHotkey. Vous choisissez des actions dans une liste.',
      },
    ],
    mode: 'jeu',
  },
  {
    slug: 'streamers',
    label: 'Streamers',
    title: 'Lancez votre direct en un clic.',
    lead: 'OBS, musique, lumières, chat, statut Discord : votre mode « Stream » prépare tout pendant que vous vous installez.',
    pains: [
      {
        title: 'Une checklist avant chaque live',
        text: 'Scène, lumière, musique, chat. Nexum déroule la liste, dans le bon ordre.',
      },
      {
        title: 'Un oubli se voit en direct',
        text: 'Chaque étape renvoie un résultat. Si une action échoue, vous le voyez avant de lancer.',
      },
      {
        title: 'Retour à la normale',
        text: 'Quand vous coupez le live, Nexum peut remettre votre setup comme avant.',
      },
    ],
    mode: 'stream',
  },
  {
    slug: 'teletravail',
    label: 'Télétravail',
    title: 'Un même PC, deux vies séparées.',
    lead: 'Votre mode « Travail » ouvre vos outils le matin. Votre mode « Chill » les ferme le soir et tamise la lumière. Sans y penser.',
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
        text: 'Vous composez vos modes dans l’interface, sans script ni configuration compliquée.',
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
    a: 'Nexum est une application de bureau pour Windows, macOS et Linux. Une appli mobile pour lancer vos modes à distance est prévue.',
  },
  {
    q: 'Est-ce compatible avec les anti-cheats ?',
    a: 'Nexum ne touche pas aux jeux : il les lance et règle ce qu’il y a autour (son, lumières, applis). Il n’injecte rien dans un processus de jeu.',
  },
  {
    q: 'Que faites-vous de mes données ?',
    a: 'Vos modes sont stockés sur votre machine. Si vous vous inscrivez à la bêta, nous gardons votre e-mail et vos réponses uniquement pour vous recontacter. Détails dans la page confidentialité.',
  },
];

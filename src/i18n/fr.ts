// Textes du site en français. Même forme que en.ts (le type `Dict` fait échouer la compilation si une clé manque).
// Ton (guide de marque) : vouvoiement, peu de mots, aucune exclamation, aucun emoji, titres de six mots au plus.
import type { Dict } from './en';

export const fr: Dict = {
  locale: 'fr_FR',
  decimal: ',',
  and: 'et',

  meta: {
    tagline: 'Jouer, streamer ou se détendre, sans friction.',
    description:
      'Nexum relie vos jeux, votre son, vos lumières et vos applis. Vous choisissez un mode, Nexum prépare tout votre setup en un clic, quelle que soit la marque.',
    stage: 'En développement · bêta en 2027',
  },

  nav: {
    skip: 'Aller au contenu',
    home: 'Nexum, accueil',
    main: 'Navigation principale',
    mobile: 'Navigation (mobile)',
    menu: 'Menu',
    cta: 'Rejoindre la bêta',
    language: 'Langue',
    items: {
      how: 'Fonctionnement',
      modes: 'Modes',
      integrations: 'Intégrations',
      audience: 'Pour qui',
      faq: 'FAQ',
    },
  },

  footer: {
    audience: 'Pour qui',
    nexum: 'Nexum',
    join: 'Rejoindre la bêta',
    github: 'GitHub',
    privacy: 'Confidentialité',
    credit: 'Projet EIP Epitech, conçu par {names}.',
    base: 'Nexum / Projet EIP Epitech',
  },

  hero: {
    eyebrow: 'Nexum / Votre univers',
    title: ['Un clic.', 'Tout votre setup.'],
    leadStrong: 'Nexum règle votre PC selon ce que vous faites.',
    lead: ' Vous choisissez un mode, et le son, la luminosité, les lumières et vos applis suivent. Sans script, quelle que soit la marque de votre matériel.',
    modeLines: [
      { mode: 'Gaming', what: 'Volume · Lumières · Steam' },
      { mode: 'Travail', what: 'Applis · Concentration' },
      { mode: 'Chill', what: 'Musique · Lumière tamisée' },
    ],
    primary: 'Rejoindre la bêta',
    secondary: 'Essayer un mode',
  },

  problem: {
    lab: '01 / Le problème',
    title: 'Tout se règle à la main.',
    intro: 'Avant chaque session, vous ouvrez, réglez et relancez les mêmes outils, un par un.',
    cards: [
      {
        title: 'Cinq applis pour un seul moment',
        text: 'Launcher, logiciel du casque, appli des lumières, musique, messagerie : chacun se règle à part, avant chaque session.',
      },
      {
        title: 'Une marque, un logiciel',
        text: 'Les outils des fabricants ne pilotent que leur propre matériel. Votre setup, lui, mélange plusieurs marques.',
      },
      {
        title: 'Les scripts, pour les techniciens',
        text: 'Automatiser avec AutoHotkey ou des raccourcis demande du code. La plupart des gens abandonnent.',
      },
    ],
  },

  how: {
    lab: '02 / Fonctionnement',
    title: 'Un mode, une liste d’actions.',
    intro: 'Nexum s’occupe du reste : il exécute les étapes dans l’ordre et vous dit ce qui a marché.',
    steps: [
      {
        title: 'Composez votre mode',
        text: 'Choisissez des actions dans une liste : ouvrir une appli, régler le son, changer la lumière, lancer un jeu. Aucune ligne de code.',
      },
      {
        title: 'Déclenchez-le',
        text: 'Un clic ou un raccourci aujourd’hui. Bientôt à la voix, à une heure donnée, au lancement d’un jeu ou au début d’une réunion.',
      },
      {
        title: 'Nexum vérifie',
        text: 'Chaque action renvoie un résultat. Si une lumière ne répond pas, vous le voyez, et vous pouvez relancer ou ignorer l’étape.',
      },
    ],
  },

  modesSection: {
    lab: '03 / Modes',
    title: 'Activez un mode.',
    intro: 'Choisissez un profil, puis maintenez « Activer ». Cochez la panne pour voir comment Nexum vous prévient quand une action échoue.',
    note: 'Illustration. Les étapes reprennent des actions que le prototype sait déjà faire ou qui sont prévues.',
  },

  integrations: {
    lab: '04 / Intégrations',
    title: 'Une action, plusieurs marques.',
    intro:
      'Nexum pense en besoins (« lancer la musique », « changer la lumière »), puis utilise le service que vous avez. Voici où nous en sommes, sans exagérer.',
    availableTag: 'Disponible',
    availableNote: 'dans le prototype',
    plannedTag: 'Prévu',
    plannedNote: 'sur la feuille de route',
    available: [
      'Lancer et fermer des applications',
      'Ouvrir un site ou un lien',
      'Volume du son',
      'Luminosité de l’écran',
      'Steam',
      'Epic Games',
      'GOG',
      'Philips Hue',
    ],
    planned: [
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
    ],
  },

  comparison: {
    lab: '05 / Comparaison',
    title: 'Ce que les autres ne relient pas.',
    headers: ['Outil', 'Marques', 'Code', 'Ce qu’il pilote'],
    rows: [
      { name: 'Logiciels constructeurs', sub: 'Razer Synapse, Corsair iCUE…', brands: 'Une seule marque', code: 'Sans code', scope: 'Périphériques' },
      { name: 'Scripts', sub: 'AutoHotkey, raccourcis', brands: 'Toutes', code: 'Code requis', scope: 'Ce que vous codez' },
      { name: 'Launchers', sub: 'Steam, Playnite…', brands: '—', code: 'Sans code', scope: 'Jeux seulement' },
      { name: 'Nexum', sub: 'Modes', brands: 'Toutes', code: 'Sans code', scope: 'Applis, système, jeux, lumières' },
    ],
  },

  audience: {
    lab: '06 / Pour qui',
    title: 'Un setup, trois usages.',
    discover: 'Découvrir →',
  },

  roadmap: {
    lab: '07 / Feuille de route',
    title: 'Où en est Nexum.',
    intro: 'Nexum est un projet étudiant EIP à Epitech, construit par {n} personnes : {names}. Nous avançons en public.',
    items: [
      { when: 'Aujourd’hui', what: 'Prototype sur ordinateur : modes, son, luminosité, applis, Steam / Epic / GOG, Philips Hue.' },
      { when: 'Automne 2026', what: 'Entretiens avec des joueurs, streamers et télétravailleurs pour choisir les prochains modes.' },
      { when: 'Hiver 2026', what: 'Déclencheurs automatiques, commande vocale, premières intégrations Spotify, Discord et OBS.' },
      { when: '2027', what: 'Bêta fermée pour les inscrits, puis ouverture progressive.' },
    ],
  },

  faq: {
    lab: '08 / FAQ',
    title: 'Questions fréquentes.',
    items: [
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
    ],
  },

  waitlist: {
    lab: 'Bientôt en bêta',
    title: 'Un clic. Tout votre setup.',
    leadStrong: 'Inscrivez-vous pour tester Nexum avant tout le monde.',
    lead: ' Vous recevrez un e-mail à l’ouverture de la bêta, rien d’autre. Si vous avez 20 minutes, dites-nous ce qui vous agace sur votre ordinateur : cela décidera des prochains modes.',
    email: 'E-mail',
    emailPlaceholder: 'vous@exemple.fr',
    legend: 'Vous êtes plutôt',
    profiles: {
      joueurs: 'Je joue sur PC',
      streamers: 'Je streame ou crée du contenu',
      teletravail: 'Je travaille sur mon ordinateur',
      autre: 'Autre',
    },
    pain: 'Ce qui vous agace le plus sur votre ordinateur',
    optional: '(facultatif)',
    painPlaceholder: 'Ex. : je rouvre les mêmes 6 applis chaque matin…',
    interview: 'OK pour un entretien de 20 minutes avec l’équipe (visio ou message).',
    consent: 'J’accepte que Nexum garde mon e-mail et mes réponses pour me recontacter au sujet de la bêta.',
    learnMore: 'En savoir plus',
    submit: 'Rejoindre la bêta',
    soon: 'Inscriptions bientôt ouvertes',
    checkEmail: 'Vérifiez votre adresse e-mail.',
    checkConsent: 'Cochez la case de consentement pour que nous puissions vous recontacter.',
    sending: 'Envoi…',
    successTitle: 'Vous êtes sur la liste.',
    success: 'Inscription enregistrée. Un e-mail vous préviendra à l’ouverture de la bêta.',
    error: 'L’envoi a échoué. Réessayez dans un instant.',
    offline: 'Vous semblez hors ligne. Vérifiez votre connexion puis réessayez.',
    honeypot: 'Laissez ce champ vide',
  },

  segmentPage: {
    primary: 'Rejoindre la bêta',
    secondary: 'Essayer le mode',
    whyLab: '01 / Pourquoi Nexum',
    whyTitle: 'Ce que ça change pour vous.',
    demoLab: '02 / Essai',
    demoTitle: 'Votre mode, étape par étape.',
    demoIntro: 'Maintenez « Activer ». Chaque action affiche son résultat, même quand quelque chose échoue.',
    waitlistTitle: 'Rejoignez la bêta.',
  },

  segments: {
    joueurs: {
      label: 'Joueurs',
      metaTitle: 'Nexum pour les joueurs',
      title: 'Votre partie commence avant le chargement.',
      lead: 'Un clic sur « Gaming » : les applis inutiles se ferment, le son et les lumières se règlent, la partie se lance. Steam, Epic ou GOG, peu importe.',
      pains: [
        { title: 'Trois launchers, trois logiciels', text: 'Chaque marque a son appli. Nexum les pilote toutes depuis le même mode.' },
        { title: 'Des réglages à refaire', text: 'Son, luminosité, lumières, applis en fond : vous les réglez une fois, dans un mode.' },
        { title: 'Rien à coder', text: 'Pas de script AutoHotkey. Vous choisissez des actions dans une liste.' },
      ],
    },
    streamers: {
      label: 'Streamers',
      metaTitle: 'Nexum pour les streamers',
      title: 'Lancez votre direct en un clic.',
      lead: 'OBS, musique, lumières, chat, statut Discord : votre mode « Stream » prépare tout pendant que vous vous installez.',
      pains: [
        { title: 'Une checklist avant chaque live', text: 'Scène, lumière, musique, chat. Nexum déroule la liste, dans le bon ordre.' },
        { title: 'Un oubli se voit en direct', text: 'Chaque étape renvoie un résultat. Si une action échoue, vous le voyez avant de lancer.' },
        { title: 'Retour à la normale', text: 'Quand vous coupez le live, Nexum peut remettre votre setup comme avant.' },
      ],
    },
    teletravail: {
      label: 'Télétravail',
      metaTitle: 'Nexum pour le télétravail',
      title: 'Un même PC, deux vies séparées.',
      lead: 'Votre mode « Travail » ouvre vos outils le matin. Votre mode « Chill » les ferme le soir et tamise la lumière. Sans y penser.',
      pains: [
        { title: 'Le travail déborde sur la soirée', text: 'Slack reste ouvert, les notifications continuent. Un mode ferme tout à l’heure choisie.' },
        { title: 'Préparer chaque réunion', text: 'Ouvrir le lien, vérifier le micro, couper les distractions : un seul déclencheur (prévu).' },
        { title: 'Aucune compétence technique', text: 'Vous composez vos modes dans l’interface, sans script ni configuration compliquée.' },
      ],
    },
  },

  kinds: {
    audio: 'Audio',
    screen: 'Écran',
    lighting: 'Éclairage',
    apps: 'Applis',
    launch: 'Jeux',
    link: 'Lien',
    music: 'Musique',
    status: 'Statut',
  },

  modes: {
    game: {
      name: 'Gaming',
      desc: 'Le son, les lumières et la partie, prêts ensemble',
      trigger: 'Un clic, ou quand Steam lance une partie',
      steps: [
        { label: 'Fermer les applis inutiles', detail: 'Navigateur, launcher de mise à jour', value: 'Fermées' },
        { label: 'Régler le son', detail: 'Volume à 70 %', value: '70 %' },
        { label: 'Baisser la luminosité', detail: 'Écran à 60 %', value: '60 %' },
        { label: 'Ambiance lumineuse', detail: 'Philips Hue · scène « Arène »', value: 'Arène' },
        { label: 'Lancer la partie', detail: 'Steam · Counter-Strike 2', value: 'Steam' },
      ],
    },
    stream: {
      name: 'Stream',
      desc: 'Scène, musique et lumière prêtes à diffuser',
      trigger: 'Un clic, ou un raccourci clavier',
      steps: [
        { label: 'Ouvrir OBS', detail: 'Scène « Direct »', value: 'OBS' },
        { label: 'Lancer la musique', detail: 'Playlist « Stream »', value: 'Stream' },
        { label: 'Éclairer le visage', detail: 'Philips Hue · scène « Face cam »', value: 'Face cam' },
        { label: 'Ouvrir le chat', detail: 'twitch.tv/popout/chat', value: 'twitch.tv' },
        { label: 'Passer Discord en occupé', detail: 'Statut « Ne pas déranger »', value: 'Occupé' },
      ],
    },
    work: {
      name: 'Travail',
      desc: 'Calme, lumineux, prêt pour la journée',
      trigger: 'Tous les jours à 9 h',
      steps: [
        { label: 'Ouvrir vos outils', detail: 'VS Code, Slack, agenda', value: 'VS Code' },
        { label: 'Couper les distractions', detail: 'Fermer Steam et Discord', value: 'Fermées' },
        { label: 'Lumière de bureau', detail: 'Philips Hue · scène « Concentration »', value: 'Concentration' },
        { label: 'Régler le son', detail: 'Volume à 40 %', value: '40 %' },
      ],
    },
    chill: {
      name: 'Chill',
      desc: 'Ambiance douce et musique',
      trigger: 'Automatiquement après 18 h',
      steps: [
        { label: 'Fermer le travail', detail: 'Slack, VS Code', value: 'Fermées' },
        { label: 'Lumière tamisée', detail: 'Philips Hue · scène « Détente »', value: 'Détente' },
        { label: 'Lancer la musique', detail: 'Playlist « Soirée »', value: 'Soirée' },
        { label: 'Adoucir l’écran', detail: 'Luminosité à 40 %', value: '40 %' },
      ],
    },
  },

  stage: {
    browse: 'Parcourir les profils',
    prev: 'Profil précédent',
    next: 'Profil suivant',
    group: 'Profils d’exemple',
    profiles: 'Profils · {n}',
    actions: '{n} actions',
    active: 'Actif',
    hint: 'Survolez un nœud',
    constellation: 'Constellation · {name}',
    telemetry: '{n} nœuds · ordre 01→{n}',
    stateActive: 'Profil actif',
    stateSaved: 'Profil enregistré',
    trigger: 'Déclencheur',
    systemOne: '{n} système relié',
    systemMany: '{n} systèmes reliés',
    activate: 'Activer ce profil',
    hold: 'Maintenir pour lancer',
    launching: 'Lancement… {p} %',
    isActive: 'Profil actif',
    chainDone: 'Chaîne exécutée',
    fail: 'Simuler une panne (une lumière hors ligne)',
    chain: 'Chaîne d’activation',
    count: '{n} étapes · {t} s',
    start: 'Point de départ',
    failed: 'Échec',
    journal: 'Journal de bord',
    tagRun: 'RUN',
    tagOk: 'OK',
    tagFail: 'ÉCHEC',
    tagSys: 'SYS',
    ready: 'Nexum prêt · {p} profils · {a} actions chargées',
    idle: 'Aucun profil actif · maintenez « Activer » pour lancer',
    run: 'Activation du profil {name}',
    stepFail: '{kind} → pont Philips Hue injoignable',
    doneOk: '{name} actif · {n} actions · {t} s',
    doneFail: '{name} actif · {ok} actions sur {n}',
    retry: 'Relancez l’étape ou ignorez-la.',
    already: '{name} est déjà actif',
    holdToast: 'Maintenez pour activer',
    activated: '{name} activé',
    activatedFail: '{name} activé · 1 échec',
    srSteps: '{name}, {n} étapes',
    noscript: 'Cette démo demande JavaScript.',
  },

  privacy: {
    metaDescription: 'Ce que Nexum fait des données collectées par le formulaire de la bêta.',
    lab: 'Confidentialité',
    title: 'Vos données, en clair.',
    sections: [
      {
        h: 'Ce que nous collectons',
        p: 'Uniquement ce que vous remplissez dans le formulaire de la bêta : votre e-mail, votre profil (joueur, streamer, télétravail…), votre réponse libre si vous en donnez une, votre accord pour un entretien, la page d’où vous venez et, le cas échéant, les paramètres de campagne (utm) du lien que vous avez suivi.',
      },
      {
        h: 'Pourquoi',
        p: 'Pour vous prévenir de l’ouverture de la bêta, vous proposer un entretien si vous l’avez accepté, et comprendre quels profils s’intéressent à Nexum. Base légale : votre consentement, donné en cochant la case du formulaire.',
      },
      {
        h: 'Combien de temps',
        p: 'Jusqu’à la fin du projet EIP (été 2027) au plus tard, ou jusqu’à ce que vous demandiez leur suppression. Nous ne les vendons pas et ne les partageons avec personne en dehors de l’équipe.',
      },
      {
        h: 'Ce site',
        p: 'Le site ne pose pas de cookie publicitaire et n’utilise pas d’outil de mesure tiers. Les polices sont hébergées avec le site : aucune requête vers un service externe lorsque vous le consultez. Votre choix de langue est gardé dans votre navigateur, et nulle part ailleurs.',
      },
    ],
    rights: {
      h: 'Vos droits',
      before: 'Vous pouvez consulter, corriger ou supprimer vos données, et retirer votre consentement à tout moment, en répondant à n’importe quel e-mail de l’équipe ou en nous écrivant via ',
      link: 'GitHub',
      after: '. Vous pouvez aussi saisir la CNIL (cnil.fr).',
    },
    back: '← Retour à l’accueil',
  },

  notFound: {
    title: 'Page introuvable',
    lab: 'Erreur 404',
    heading: 'Cette page ne s’est pas alignée.',
    lead: 'Le lien est peut-être ancien, ou la page a changé d’adresse.',
    back: 'Retour à l’accueil',
  },
};

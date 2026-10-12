// Textes du site en anglais (langue principale). fr.ts doit avoir exactement la même forme.
// Ton (guide de marque) : calme, précis, direct. Aucune exclamation, aucun emoji, titres de six mots au plus.
export const en = {
  locale: 'en_US',
  decimal: '.',
  and: 'and',

  meta: {
    tagline: 'Play, stream or unwind, without friction.',
    description:
      'Nexum connects your games, sound, lights and apps. You pick a mode, Nexum sets up your whole setup in one click, whatever the brand.',
    stage: 'In development · beta in 2027',
  },

  nav: {
    skip: 'Skip to content',
    home: 'Nexum, home',
    main: 'Main navigation',
    mobile: 'Navigation (mobile)',
    menu: 'Menu',
    cta: 'Join the beta',
    language: 'Language',
    items: {
      how: 'How it works',
      modes: 'Modes',
      integrations: 'Integrations',
      audience: 'Use cases',
      faq: 'FAQ',
    },
  },

  footer: {
    audience: 'Use cases',
    nexum: 'Nexum',
    join: 'Join the beta',
    github: 'GitHub',
    privacy: 'Privacy',
    credit: 'EIP Epitech project, designed by {names}.',
    base: 'Nexum / EIP Epitech project',
  },

  hero: {
    eyebrow: 'Nexum / Your universe',
    title: ['One click.', 'Your whole setup.'],
    leadStrong: 'Nexum sets up your PC for what you are doing.',
    lead: ' You pick a mode, and the sound, brightness, lights and your apps follow. No scripts, whatever brand your gear is.',
    modeLines: [
      { mode: 'Gaming', what: 'Volume · Lights · Steam' },
      { mode: 'Work', what: 'Apps · Focus' },
      { mode: 'Chill', what: 'Music · Dimmed light' },
    ],
    primary: 'Join the beta',
    secondary: 'Try a mode',
  },

  problem: {
    lab: '01 / The problem',
    title: 'Everything is set by hand.',
    intro: 'Before every session, you open, adjust and relaunch the same tools, one by one.',
    cards: [
      {
        title: 'Five apps for one moment',
        text: 'Launcher, headset software, lights app, music, chat: each one is set separately, before every session.',
      },
      {
        title: 'One brand, one software',
        text: 'Manufacturer tools only control their own hardware. Your setup mixes several brands.',
      },
      {
        title: 'Scripts are for technicians',
        text: 'Automating with AutoHotkey or shortcuts takes code. Most people give up.',
      },
    ],
  },

  how: {
    lab: '02 / How it works',
    title: 'A mode is a list of actions.',
    intro: 'Nexum does the rest: it runs the steps in order and tells you what worked.',
    steps: [
      {
        title: 'Build your mode',
        text: 'Pick actions from a list: open an app, set the volume, change the light, launch a game. No code.',
      },
      {
        title: 'Trigger it',
        text: 'A click or a shortcut today. Soon by voice, at a set time, when a game starts or a meeting begins.',
      },
      {
        title: 'Nexum checks',
        text: 'Every action returns a result. If a light does not respond, you see it, and you can retry or skip the step.',
      },
    ],
  },

  modesSection: {
    lab: '03 / Modes',
    title: 'Activate a mode.',
    intro: 'Pick a profile, then hold “Activate”. Tick the failure box to see how Nexum warns you when an action fails.',
    note: 'Illustration. The steps use actions the prototype can already do, or that are planned.',
  },

  integrations: {
    lab: '04 / Integrations',
    title: 'One action, several brands.',
    intro:
      'Nexum thinks in needs (“start the music”, “change the light”), then uses the service you have. Here is where we stand, without overselling.',
    availableTag: 'Available',
    availableNote: 'in the prototype',
    plannedTag: 'Planned',
    plannedNote: 'on the roadmap',
    available: [
      'Launch and close applications',
      'Open a website or link',
      'Sound volume',
      'Screen brightness',
      'Steam',
      'Epic Games',
      'GOG',
      'Philips Hue',
    ],
    planned: [
      'Voice control',
      'Spotify',
      'Discord',
      'OBS Studio',
      'Govee',
      'Nanoleaf',
      'Home Assistant',
      'Google Calendar',
      'Outlook',
      'Slack',
      'Teams',
      'Community extensions',
    ],
  },

  comparison: {
    lab: '05 / Comparison',
    title: 'What other tools don’t connect.',
    headers: ['Tool', 'Brands', 'Code', 'What it controls'],
    rows: [
      { name: 'Manufacturer software', sub: 'Razer Synapse, Corsair iCUE…', brands: 'One brand only', code: 'No code', scope: 'Peripherals' },
      { name: 'Scripts', sub: 'AutoHotkey, shortcuts', brands: 'All', code: 'Code required', scope: 'Whatever you code' },
      { name: 'Launchers', sub: 'Steam, Playnite…', brands: '—', code: 'No code', scope: 'Games only' },
      { name: 'Nexum', sub: 'Modes', brands: 'All', code: 'No code', scope: 'Apps, system, games, lights' },
    ],
  },

  audience: {
    lab: '06 / Use cases',
    title: 'One setup, three uses.',
    discover: 'Discover →',
  },

  roadmap: {
    lab: '07 / Roadmap',
    title: 'Where Nexum stands.',
    intro: 'Nexum is an EIP student project at Epitech, built by {n} people: {names}. We build in public.',
    items: [
      { when: 'Today', what: 'Desktop prototype: modes, sound, brightness, apps, Steam / Epic / GOG, Philips Hue.' },
      { when: 'Autumn 2026', what: 'Interviews with gamers, streamers and remote workers to choose the next modes.' },
      { when: 'Winter 2026', what: 'Automatic triggers, voice control, first Spotify, Discord and OBS integrations.' },
      { when: '2027', what: 'Closed beta for subscribers, then gradual opening.' },
    ],
  },

  faq: {
    lab: '08 / FAQ',
    title: 'Frequently asked questions.',
    items: [
      {
        q: 'Is Nexum available?',
        a: 'Not yet. Nexum is a student project in development (EIP Epitech). A prototype already runs on desktop; a closed beta is planned for 2027 for subscribers.',
      },
      {
        q: 'How much will it cost?',
        a: 'The beta will be free. We plan a free version for basic use and a paid plan for advanced features and the cloud. Prices are not set: we are testing them with you.',
      },
      {
        q: 'Which systems?',
        a: 'Nexum is a desktop app for Windows, macOS and Linux. A mobile app to launch your modes remotely is planned.',
      },
      {
        q: 'Is it compatible with anti-cheats?',
        a: 'Nexum does not touch games: it launches them and sets what is around them (sound, lights, apps). It injects nothing into a game process.',
      },
      {
        q: 'What do you do with my data?',
        a: 'Your modes are stored on your machine. If you sign up for the beta, we keep your email and answers only to contact you again. Details on the privacy page.',
      },
    ],
  },

  waitlist: {
    lab: 'Beta coming soon',
    title: 'One click. Your whole setup.',
    leadStrong: 'Sign up to test Nexum before everyone else.',
    lead: ' You will get one email when the beta opens, nothing else. If you have 20 minutes, tell us what annoys you on your computer: it will decide the next modes.',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    legend: 'You are mostly',
    profiles: {
      joueurs: 'I play on PC',
      streamers: 'I stream or create content',
      teletravail: 'I work on my computer',
      autre: 'Other',
    },
    pain: 'What annoys you most on your computer',
    optional: '(optional)',
    painPlaceholder: 'E.g. I reopen the same 6 apps every morning…',
    interview: 'OK for a 20-minute interview with the team (video call or message).',
    consent: 'I agree that Nexum keeps my email and answers to contact me about the beta.',
    learnMore: 'Learn more',
    submit: 'Join the beta',
    soon: 'Sign-ups opening soon',
    checkEmail: 'Check your email address.',
    checkConsent: 'Tick the consent box so we can contact you.',
    sending: 'Sending…',
    successTitle: 'You are on the list.',
    success: 'Sign-up recorded. An email will tell you when the beta opens.',
    error: 'Sending failed. Try again in a moment.',
    offline: 'You appear to be offline. Check your connection and try again.',
    honeypot: 'Leave this field empty',
  },

  segmentPage: {
    primary: 'Join the beta',
    secondary: 'Try the mode',
    whyLab: '01 / Why Nexum',
    whyTitle: 'What it changes for you.',
    demoLab: '02 / Try it',
    demoTitle: 'Your mode, step by step.',
    demoIntro: 'Hold “Activate”. Every action shows its result, even when something fails.',
    waitlistTitle: 'Join the beta.',
  },

  segments: {
    joueurs: {
      label: 'Gamers',
      metaTitle: 'Nexum for gamers',
      title: 'Your game starts before it loads.',
      lead: 'One click on “Gaming”: useless apps close, sound and lights are set, the game launches. Steam, Epic or GOG, whichever.',
      pains: [
        { title: 'Three launchers, three programs', text: 'Every brand has its app. Nexum controls them all from the same mode.' },
        { title: 'Settings to redo', text: 'Sound, brightness, lights, background apps: set them once, in a mode.' },
        { title: 'Nothing to code', text: 'No AutoHotkey script. You pick actions from a list.' },
      ],
    },
    streamers: {
      label: 'Streamers',
      metaTitle: 'Nexum for streamers',
      title: 'Go live in one click.',
      lead: 'OBS, music, lights, chat, Discord status: your “Stream” mode sets everything up while you settle in.',
      pains: [
        { title: 'A checklist before every live', text: 'Scene, light, music, chat. Nexum runs the list, in the right order.' },
        { title: 'A miss shows up on air', text: 'Every step returns a result. If an action fails, you see it before going live.' },
        { title: 'Back to normal', text: 'When you end the stream, Nexum can put your setup back as it was.' },
      ],
    },
    teletravail: {
      label: 'Remote work',
      metaTitle: 'Nexum for remote work',
      title: 'One PC, two separate lives.',
      lead: 'Your “Work” mode opens your tools in the morning. Your “Chill” mode closes them in the evening and dims the light. Without thinking about it.',
      pains: [
        { title: 'Work spills into the evening', text: 'Slack stays open, notifications keep coming. A mode closes everything at the time you choose.' },
        { title: 'Get ready for every meeting', text: 'Open the link, check the mic, cut distractions: a single trigger (planned).' },
        { title: 'No technical skills', text: 'You build your modes in the interface, with no script or complicated setup.' },
      ],
    },
  },

  kinds: {
    audio: 'Audio',
    screen: 'Screen',
    lighting: 'Lighting',
    apps: 'Apps',
    launch: 'Games',
    link: 'Link',
    music: 'Music',
    status: 'Status',
  },

  modes: {
    game: {
      name: 'Gaming',
      desc: 'Sound, lights and game, ready together',
      trigger: 'One click, or when Steam starts a game',
      steps: [
        { label: 'Close unneeded apps', detail: 'Browser, update launcher', value: 'Closed' },
        { label: 'Set the sound', detail: 'Volume at 70%', value: '70%' },
        { label: 'Lower the brightness', detail: 'Screen at 60%', value: '60%' },
        { label: 'Lighting mood', detail: 'Philips Hue · scene “Arena”', value: 'Arena' },
        { label: 'Launch the game', detail: 'Steam · Counter-Strike 2', value: 'Steam' },
      ],
    },
    stream: {
      name: 'Stream',
      desc: 'Scene, music and light ready to broadcast',
      trigger: 'One click, or a keyboard shortcut',
      steps: [
        { label: 'Open OBS', detail: 'Scene “Live”', value: 'OBS' },
        { label: 'Start the music', detail: 'Playlist “Stream”', value: 'Stream' },
        { label: 'Light your face', detail: 'Philips Hue · scene “Face cam”', value: 'Face cam' },
        { label: 'Open the chat', detail: 'twitch.tv/popout/chat', value: 'twitch.tv' },
        { label: 'Set Discord to busy', detail: 'Status “Do not disturb”', value: 'Busy' },
      ],
    },
    work: {
      name: 'Work',
      desc: 'Calm, bright, ready for the day',
      trigger: 'Every day at 9 am',
      steps: [
        { label: 'Open your tools', detail: 'VS Code, Slack, calendar', value: 'VS Code' },
        { label: 'Cut distractions', detail: 'Close Steam and Discord', value: 'Closed' },
        { label: 'Office light', detail: 'Philips Hue · scene “Focus”', value: 'Focus' },
        { label: 'Set the sound', detail: 'Volume at 40%', value: '40%' },
      ],
    },
    chill: {
      name: 'Chill',
      desc: 'Soft mood and music',
      trigger: 'Automatically after 6 pm',
      steps: [
        { label: 'Close work', detail: 'Slack, VS Code', value: 'Closed' },
        { label: 'Dimmed light', detail: 'Philips Hue · scene “Relax”', value: 'Relax' },
        { label: 'Start the music', detail: 'Playlist “Evening”', value: 'Evening' },
        { label: 'Soften the screen', detail: 'Brightness at 40%', value: '40%' },
      ],
    },
  },

  stage: {
    browse: 'Browse profiles',
    prev: 'Previous profile',
    next: 'Next profile',
    group: 'Example profiles',
    profiles: 'Profiles · {n}',
    actions: '{n} actions',
    active: 'Active',
    hint: 'Hover a node',
    constellation: 'Constellation · {name}',
    telemetry: '{n} nodes · order 01→{n}',
    stateActive: 'Active profile',
    stateSaved: 'Saved profile',
    trigger: 'Trigger',
    systemOne: '{n} linked system',
    systemMany: '{n} linked systems',
    activate: 'Activate this profile',
    hold: 'Hold to launch',
    launching: 'Launching… {p}%',
    isActive: 'Profile active',
    chainDone: 'Chain executed',
    fail: 'Simulate a failure (a light offline)',
    chain: 'Activation chain',
    count: '{n} steps · {t} s',
    start: 'Starting point',
    failed: 'Failed',
    journal: 'Activity log',
    tagRun: 'RUN',
    tagOk: 'OK',
    tagFail: 'FAIL',
    tagSys: 'SYS',
    ready: 'Nexum ready · {p} profiles · {a} actions loaded',
    idle: 'No active profile · hold “Activate” to launch',
    run: 'Activating profile {name}',
    stepFail: '{kind} → Philips Hue bridge unreachable',
    doneOk: '{name} active · {n} actions · {t} s',
    doneFail: '{name} active · {ok} of {n} actions',
    retry: 'Retry the step or skip it.',
    already: '{name} is already active',
    holdToast: 'Hold to activate',
    activated: '{name} activated',
    activatedFail: '{name} activated · 1 failure',
    srSteps: '{name}, {n} steps',
    noscript: 'This demo needs JavaScript.',
  },

  privacy: {
    metaDescription: 'What Nexum does with the data collected by the beta form.',
    lab: 'Privacy',
    title: 'Your data, plainly.',
    sections: [
      {
        h: 'What we collect',
        p: 'Only what you fill in on the beta form: your email, your profile (gamer, streamer, remote work…), your free-text answer if you give one, your agreement to an interview, the page you came from and, where relevant, the campaign parameters (utm) of the link you followed.',
      },
      {
        h: 'Why',
        p: 'To tell you when the beta opens, to offer you an interview if you agreed, and to understand which profiles are interested in Nexum. Legal basis: your consent, given by ticking the box on the form.',
      },
      {
        h: 'How long',
        p: 'Until the end of the EIP project (summer 2027) at the latest, or until you ask us to delete them. We do not sell them and do not share them with anyone outside the team.',
      },
      {
        h: 'This site',
        p: 'The site sets no advertising cookies and uses no third-party analytics. Fonts are hosted with the site, so viewing it makes no request to an external service. Your language choice is kept in your browser and nowhere else.',
      },
    ],
    rights: {
      h: 'Your rights',
      before: 'You can view, correct or delete your data, and withdraw your consent at any time, by replying to any email from the team or by writing to us via ',
      link: 'GitHub',
      after: '. You can also contact your data protection authority (in France, the CNIL: cnil.fr).',
    },
    back: '← Back to home',
  },

  notFound: {
    title: 'Page not found',
    lab: 'Error 404',
    heading: 'This page did not line up.',
    lead: 'The link may be old, or the page has moved.',
    back: 'Back to home',
  },
};

export type Dict = typeof en;

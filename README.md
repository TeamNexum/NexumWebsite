# Nexum · site vitrine

Site de présentation de [Nexum](https://github.com/TeamNexum/Nexum) : l’application qui prépare tout votre setup (son, lumières, applis, jeux) en un clic, selon le mode choisi.

Le site sert aussi à la validation marché du projet EIP : le formulaire de la bêta recrute des testeurs et des volontaires pour les entretiens, et chaque inscription indique la page d’origine (accueil, joueurs, streamers, télétravail) pour comparer les cibles.

## Stack

- [Astro](https://astro.build) 7, site 100 % statique, sans framework JS côté client.
- CSS maison avec les tokens du guide de marque Nexum (direction artistique « Galaxy » v1.0) ; polices hébergées avec le site (Press Start 2P, Silkscreen, JetBrains Mono via Fontsource).
- Un seul thème, toujours sombre, comme l’application : ciel et galaxie en pixels (canvas, trame de Bayer), cadres aux coins crantés, une seule teinte de profil par page (violet par défaut, celle du mode sur les pages joueurs / streamers / télétravail).
- Ton du guide : calme, direct, aucune exclamation, aucun emoji, titres de six mots au plus (vouvoiement en français).
- Deux langues : **anglais** (principale, à la racine : `/`, `/for/gamers`, `/privacy`) et **français** (`/fr/`, `/fr/pour/joueurs`, `/fr/confidentialite`). Le sélecteur EN / FR de l’en-tête garde le choix dans le navigateur (`localStorage`, clé `nexum-lang`) : un visiteur qui choisit le français y est renvoyé quand il ouvre `/`. Les anciennes adresses françaises (`/pour/...`, `/confidentialite`) redirigent vers `/fr/...`.

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:4321/NexumWebsite/
npm run build      # astro check + build dans dist/
npm run preview
```

## Tests

```bash
npm test           # build à part (dist-test/) avec un faux point d'accès de formulaire, puis tests Playwright
```

Plus de 80 tests, sur ordinateur et sur mobile (Chromium) : toutes les pages (langue, un seul `h1`, pas de défilement horizontal), **accessibilité avec axe-core** (WCAG 2.1 A et AA, dont les contrastes), sélecteur de langue et redirections, formulaire de bout en bout (validation, succès, 422, erreur serveur, double envoi, champ piège ; les envois sont interceptés, rien ne part vraiment), démo (clavier, panne simulée, son coupé par défaut) et barre mobile. Au premier lancement : `npx playwright install chromium`. Le workflow GitHub les exécute à chaque push et pull request, et **un échec bloque le déploiement**.

## Configuration

| Variable | Rôle |
|---|---|
| `PUBLIC_FORM_ENDPOINT` | URL qui reçoit le formulaire de la bêta (POST `FormData`, réponse JSON ; compatible Formspree). Vide : le bouton affiche « Inscriptions bientôt ouvertes ». |
| `SITE_URL` | URL publique (défaut `https://teamnexum.github.io`). |
| `BASE_PATH` | Préfixe des pages (défaut `/NexumWebsite`, `/` avec un domaine perso). |

Copier `.env.example` en `.env` pour le développement local.

## Formulaire de la bêta

Le site est statique : le formulaire envoie ses réponses à un service externe. Sans lui, le bouton reste désactivé (« Inscriptions bientôt ouvertes »). Mise en route (2 minutes, avec [Formspree](https://formspree.io), gratuit) :

1. Créer un compte, puis **New form** : indiquer l’e-mail de l’équipe qui recevra les inscriptions. Formspree donne une URL du type `https://formspree.io/f/xxxxxxxx`.
2. Sur GitHub : **Settings → Secrets and variables → Actions → Variables → New repository variable**, nom `PUBLIC_FORM_ENDPOINT`, valeur = cette URL.
3. Relancer le déploiement (Actions → Deploy → *Run workflow*, ou un push sur `main`). La valeur est lue au **build** : sans nouveau build, le site ne la voit pas.
4. Tester une inscription sur le site publié ; elle arrive par e-mail et dans l’onglet *Submissions* de Formspree.

Tout service qui accepte un `POST` multipart avec l’en-tête `Accept: application/json` et répond `200` convient (Getform, Basin, un petit serveur à soi…).

Ce que le formulaire fait : validation de l’e-mail et du consentement (messages sous le champ, focus sur l’erreur), refus du service affiché sur le champ e-mail (422), message d’erreur si le service est injoignable ou ne répond pas en 15 s, un seul envoi à la fois, écran de confirmation à la place du formulaire une fois l’envoi réussi, et un champ piège `_gotcha` contre les robots. Chaque inscription porte : `email`, `profil`, `agacement`, `entretien`, `consentement`, `segment` (page d’origine : `accueil`, `joueurs`, `streamers`, `teletravail`), `lang` (`en` / `fr`), `page`, et les `utm_*` du lien suivi.

## Structure

```
src/
  i18n/en.ts, fr.ts     TOUS les textes affichés, par langue (fr.ts est typé sur en.ts : une clé manquante casse le build)
  i18n/index.ts         langues, fmt() pour les {variables}
  i18n/routes.ts        adresses des pages par langue (paths.home, paths.segment, paths.privacy…)
  data/site.ts          données sans texte : teintes et icônes des modes, ordre des étapes, segments, équipe
  data/icons.ts         icônes de la charte (24 × 24, contours de 1,5 px)
  layouts/Base.astro    <head> (hreflang, canonical), ciel de fond, en-tête et pied de page
  scripts/              sky.ts (Voie lactée pixel), galaxy.ts (galaxie pixel animée), sound.ts (effets sonores de la démo,
                        synthétisés), reveal.ts (apparition des sections au défilement)
  components/           Header (+ sélecteur de langue), Footer, Sky, Mark (logo), Hero (couverture),
                        ModeStage (démo : constellation, « maintenir pour lancer », journal, son), Waitlist (formulaire),
                        StickyCta (barre « Rejoindre la bêta » sur mobile)
  views/                Home, Segment, Privacy : une seule version, appelée avec `lang="en"` ou `lang="fr"`
  pages/                index, for/[segment], privacy (anglais) ; fr/index, fr/pour/[segment], fr/confidentialite (français) ; 404
  styles/global.css     tokens du guide, cadre cranté, étiquettes, boutons
tests/                  Playwright : site.spec (pages, axe, langues), form.spec (formulaire), demo.spec (démo, son)
public/og/              aperçus de partage (1200 × 630), un par page et par langue : home|gamers|streamers|remote-work-{en,fr}.jpeg
```

**Comportements à connaître :**

- *Apparition au défilement* : un élément marqué `data-reveal` apparaît par paliers (`steps()`) en entrant à l'écran. Rien n'est caché sans JavaScript ni avec « réduire les animations » (la classe `rv` sur `<html>` n'est posée que si les deux sont réunis, et un filet de sécurité la retire après 3 s si le script n'a pas démarré).
- *Démo* : au clavier, Entrée ou Espace sur « Activer » lance tout de suite ; ← → parcourent les profils, 1 à 4 en choisissent un. Le son est **coupé par défaut** ; le bouton « Son » l'active (choix gardé dans `localStorage`, clé `nexum-sound`). Les sons sont synthétisés (Web Audio), aucun fichier.
- *Barre mobile* : apparaît après la couverture, disparaît devant le formulaire et le pied de page. Sur une page de cible, les boutons « Rejoindre la bêta » mènent au formulaire de **cette** page, pour que l'inscription compte pour la bonne cible.
- *Aperçus de partage* : pas générés au build. Pour les refaire après un changement de la couverture, capturer la couverture de chaque page en 1200 × 630 (en-tête masqué) et remplacer les fichiers de `public/og/`.

**Règle de contenu :** ne marquer « disponible » que ce qui marche dans le prototype (`crates/nexum-schema/src/action_types.rs` du dépôt Nexum). Le reste est « prévu ».

**Modifier un texte :** toujours dans `src/i18n/en.ts` ET `src/i18n/fr.ts`. **Ajouter une langue :** copier `en.ts` en `xx.ts`, l’ajouter dans `i18n/index.ts` (`Lang`, `langs`, `dict`) et dans `i18n/routes.ts`, puis créer les pages sous `src/pages/xx/`.

## Déploiement

GitHub Actions (`.github/workflows/deploy.yml`) construit le site à chaque PR et le publie sur GitHub Pages à chaque push sur `main`. À activer une fois : **Settings → Pages → Source : GitHub Actions**, puis ajouter la variable `PUBLIC_FORM_ENDPOINT` dans **Settings → Secrets and variables → Actions → Variables**.

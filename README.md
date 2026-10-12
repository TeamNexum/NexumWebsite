# Nexum · site vitrine

Site de présentation de [Nexum](https://github.com/TeamNexum/Nexum) : l’application qui prépare tout votre setup (son, lumières, applis, jeux) en un clic, selon le mode choisi.

Le site sert aussi à la validation marché du projet EIP : le formulaire de la bêta recrute des testeurs et des volontaires pour les entretiens, et chaque inscription indique la page d’origine (accueil, joueurs, streamers, télétravail) pour comparer les cibles.

## Stack

- [Astro](https://astro.build) 7, site 100 % statique, sans framework JS côté client.
- CSS maison avec les tokens du guide de marque Nexum (direction artistique « Galaxy » v1.0) ; polices hébergées avec le site (Press Start 2P, Silkscreen, JetBrains Mono via Fontsource).
- Un seul thème, toujours sombre, comme l’application : ciel et galaxie en pixels (canvas, trame de Bayer), cadres aux coins crantés, une seule teinte de profil par page (violet par défaut, celle du mode sur les pages joueurs / streamers / télétravail).
- Ton du guide : vouvoiement, aucune exclamation, aucun emoji, titres de six mots au plus.

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:4321/NexumWebsite/
npm run build      # astro check + build dans dist/
npm run preview
```

## Configuration

| Variable | Rôle |
|---|---|
| `PUBLIC_FORM_ENDPOINT` | URL qui reçoit le formulaire de la bêta (POST `FormData`, réponse JSON ; compatible Formspree). Vide : le bouton affiche « Inscriptions bientôt ouvertes ». |
| `SITE_URL` | URL publique (défaut `https://teamnexum.github.io`). |
| `BASE_PATH` | Préfixe des pages (défaut `/NexumWebsite`, `/` avec un domaine perso). |

Copier `.env.example` en `.env` pour le développement local.

## Structure

```
src/
  data/site.ts          contenu : modes de démo (avec leur teinte), intégrations, cibles, FAQ, équipe
  data/icons.ts         icônes de la charte (24 × 24, contours de 1,5 px)
  layouts/Base.astro    <head>, ciel de fond, en-tête et pied de page
  scripts/              sky.ts (Voie lactée pixel), galaxy.ts (galaxie pixel animée)
  components/           Header, Footer, Sky, Mark (logo), Hero (couverture),
                        ModeStage (démo : constellation, « maintenir pour lancer », journal), Waitlist (formulaire)
  pages/                accueil, pour/[segment] (joueurs, streamers, teletravail), confidentialite, 404
  styles/global.css     tokens du guide, cadre cranté, étiquettes, boutons
```

**Règle de contenu :** ne marquer « disponible » que ce qui marche dans le prototype (`crates/nexum-schema/src/action_types.rs` du dépôt Nexum). Le reste est « prévu ».

## Déploiement

GitHub Actions (`.github/workflows/deploy.yml`) construit le site à chaque PR et le publie sur GitHub Pages à chaque push sur `main`. À activer une fois : **Settings → Pages → Source : GitHub Actions**, puis ajouter la variable `PUBLIC_FORM_ENDPOINT` dans **Settings → Secrets and variables → Actions → Variables**.

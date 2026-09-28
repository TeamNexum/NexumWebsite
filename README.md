# Nexum · site vitrine

Site de présentation de [Nexum](https://github.com/TeamNexum/Nexum) : l’application qui prépare tout ton setup (son, lumières, applis, jeux) en un clic, selon le mode choisi.

Le site sert aussi à la validation marché du projet EIP : le formulaire de la bêta recrute des testeurs et des volontaires pour les entretiens, et chaque inscription indique la page d’origine (accueil, joueurs, streamers, télétravail) pour comparer les cibles.

## Stack

- [Astro](https://astro.build) 7, site 100 % statique, sans framework JS côté client.
- CSS maison avec les tokens de la charte Nexum ; polices hébergées avec le site (Inter, Archivo, JetBrains Mono via Fontsource).
- Deux thèmes : **sombre** = charte monochrome actuelle ; **clair** = direction artistique « Galaxie ». Par défaut, celui du système ; le bouton de l’en-tête le change et le choix est gardé dans le navigateur.

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
  data/site.ts          contenu : modes de démo, intégrations, cibles, FAQ, équipe
  layouts/Base.astro    <head>, thème, en-tête et pied de page
  components/           Header, Footer, Galaxy (visuel), ModeDemo (démo), Waitlist (formulaire), Star
  pages/                accueil, pour/[segment] (joueurs, streamers, teletravail), confidentialite, 404
```

**Règle de contenu :** ne marquer « disponible » que ce qui marche dans le prototype (`crates/nexum-schema/src/action_types.rs` du dépôt Nexum). Le reste est « prévu ».

## Déploiement

GitHub Actions (`.github/workflows/deploy.yml`) construit le site à chaque PR et le publie sur GitHub Pages à chaque push sur `main`. À activer une fois : **Settings → Pages → Source : GitHub Actions**, puis ajouter la variable `PUBLIC_FORM_ENDPOINT` dans **Settings → Secrets and variables → Actions → Variables**.

# ARM Services — Site Vitrine Déménagement

Site vitrine pour ARM Services, entreprise de déménagement basée à Marseille. Construit avec Astro 6, Tailwind 4, SEO complet (sitemap, Open Graph), déploiement GitHub Pages.

**Prérequis :** Node.js ≥ 22.12 (voir `package.json` → `engines`).

---

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Démarrage rapide](#démarrage-rapide)
- [Structure du projet](#structure-du-projet)
- [Configuration](#configuration)
- [Composants](#composants)
- [Configuration SEO](#configuration-seo)
- [Conventions de style](#conventions-de-style)
- [Déploiement](#déploiement)
- [Commandes](#commandes)

---

## Fonctionnalités

- **SEO** : Open Graph, Twitter Cards, canonical URLs, hreflang (FR + EN), JSON-LD, sitemap, `robots.txt` généré
- **i18n** : français / anglais (`fr.json`, `en.json`), route `/en/` ; switcher masqué si `ENABLE_MULTILANG=false`
- **FAQ** : ContentForge si `CONTENTFORGE_ENABLED=true` + token ; sinon texte dans `fr.json` / `en.json` (les avis viennent toujours des traductions)
- **Formulaire de contact** : dialogue dans la section contact, `POST` vers ContentForge (`PUBLIC_CONTACT_FORM_URL` + **`PUBLIC_CONTACT_FORM_TOKEN`**, header `Authorization: Bearer`)
- **Gabarit e-mail** : `src/templates/email/contact-message.html` et `buildArmContactEmailHtml()` dans `src/lib/email/contactMailHtml.ts` pour le service qui envoie les mails
- **Sections landing** : Hero, TrustBar, Services, Process, Areas, WhyUs, Reviews, QuoteCTA, FinalCTA (inclut le formulaire), Footer
- **Pages légales** : Mentions légales, Politique de confidentialité, CGV
- **Accessibilité** : HTML sémantique, labels ARIA
- **Animations** : Fade-in, scroll reveal avec `prefers-reduced-motion`
- **LLM-ready** : Instructions pour Cursor, GitHub Copilot et Codex

---

## Démarrage rapide

### Installation

```sh
git clone https://github.com/YOUR_USER/arm-services-astro.git
cd arm-services-astro
pnpm install
pnpm dev
```

### Configuration initiale

Après clonage, copier **`.env.example`** vers **`.env`** puis ajuster si besoin (`ENABLE_MULTILANG`, `CONTENTFORGE_*`, **`PUBLIC_CONTACT_FORM_URL`**, **`PUBLIC_CONTACT_FORM_TOKEN`**). Mettre à jour notamment :

1. **`astro.config.mjs`** — Définir `site` et `base` pour l'URL de déploiement
2. **`src/site.config.ts`** — Identité du site, contact, réseaux, image OG
3. **`src/i18n/locales/fr.json`** et **`en.json`** — Textes (accueil, sections, pages légales)

---

## Structure du projet

```text
/
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── site.webmanifest
│   └── android-chrome-512x512.png
├── src/
│   ├── assets/
│   │   └── images/           # Images importées (hero, etc.)
│   ├── components/           # Sections landing
│   │   ├── Hero.astro
│   │   ├── TrustBar.astro
│   │   ├── Services.astro
│   │   ├── Process.astro
│   │   ├── Areas.astro
│   │   ├── WhyUs.astro
│   │   ├── Reviews.astro
│   │   ├── QuoteCTA.astro
│   │   ├── FinalCTA.astro
│   │   ├── ContactFormDialog.astro
│   │   └── Footer.astro
│   ├── lib/
│   │   ├── email/
│   │   │   └── contactMailHtml.ts
│   │   ├── paths.ts
│   │   ├── seo.ts
│   │   └── contentforge.ts
│   ├── templates/
│   │   └── email/
│   │       └── contact-message.html
│   ├── layouts/
│   │   └── Layout.astro      # SEO: Meta tags, Open Graph
│   ├── i18n/
│   │   ├── i18n.ts
│   │   └── locales/          # fr.json, en.json
│   ├── pages/
│   │   ├── index.astro       # Page d'accueil
│   │   ├── legal-notice.astro
│   │   ├── privacy-policy.astro
│   │   ├── terms-of-service.astro
│   │   ├── robots.txt.ts
│   │   └── en/
│   │       ├── index.astro
│   │       ├── legal-notice.astro
│   │       ├── privacy-policy.astro
│   │       └── terms-of-service.astro
│   └── styles/
│       └── global.css        # Tailwind + thème arménien + animations
├── astro.config.mjs          # SEO: Site URL et base path
├── AGENTS.md                 # Instructions Codex de base
├── AGENTS.project.md         # Instructions Codex spécifiques au projet
└── .cursor/rules/            # Règles Cursor AI
```

---

## Configuration

### Configuration Astro (`astro.config.mjs`)

Mettre à jour `site` et `base` pour le déploiement :

```javascript
// SEO: Domaine personnalisé
const site = 'https://arm-services-demenagement.fr';
const base = '/';

// OU pour GitHub Pages sans domaine perso :
// const site = 'https://heavensal.github.io';
// const base = '/arm-services-astro';
```

### Configuration SEO (`src/layouts/Layout.astro`)

Les valeurs par défaut du titre et description sont définies dans le Layout :

```typescript
const {
  title = 'ARM Services | Déménagement Marseille & France — Devis gratuit',
  description = 'ARM Services, déménagement à Marseille...',
  ogImage = 'android-chrome-512x512.png',
} = Astro.props;
```

---

## Composants

### Architecture des composants

Les sections landing sont des composants Astro autonomes :

```astro
---
/**
 * ComponentName — description courte de la section.
 */
interface Props {
  phone?: string;
  // autres props optionnelles
}

const { phone = "06 43 09 65 97" } = Astro.props;
---

<section class="..." aria-label="Section description">
  <!-- Contenu -->
</section>
```

### Liste des composants

| Composant | Description |
|-----------|-------------|
| `Hero.astro` | Bannière plein écran avec image, H1 SEO, CTAs |
| `TrustBar.astro` | Barre de confiance (chiffres clés) |
| `Services.astro` | Grille des services proposés |
| `Process.astro` | Étapes du processus de déménagement |
| `Areas.astro` | Zones d'intervention |
| `WhyUs.astro` | Pourquoi nous choisir |
| `Reviews.astro` | Témoignages clients |
| `QuoteCTA.astro` | Appel à l'action devis |
| `FinalCTA.astro` | CTA final de contact |
| `Footer.astro` | Pied de page avec liens légaux |

### Créer un nouveau composant

1. Créer `src/components/NewSection.astro`
2. Importer et ajouter dans `src/pages/index.astro`

---

## Configuration SEO

Les fichiers et éléments suivants nécessitent une mise à jour pour le SEO :

### 1. URL du site (`astro.config.mjs`)

```javascript
// SEO: Mettre à jour le domaine de production
const site = 'https://arm-services-demenagement.fr';
const base = '/';
```

### 2. Meta tags (`src/layouts/Layout.astro`)

Le Layout gère automatiquement :
- Titre et description
- URL canonique
- Open Graph (type, title, description, url, locale, site_name, image)
- Twitter Cards

### 3. Fichiers statiques (`public/`)

- `site.webmanifest` — PWA manifest
- `android-chrome-512x512.png` — Image OG par défaut
- `favicon.svg`, `favicon.ico` — Favicons

---

## Conventions de style

### Tailwind CSS — Règles strictes

Ce projet utilise **Tailwind CSS 4** avec des conventions strictes.

#### ✅ FAIRE : Utiliser les classes Tailwind natives

```astro
<div class="flex items-center justify-between gap-4 px-6 py-4">
  <h2 class="text-2xl font-bold text-gray-900 md:text-3xl">Titre</h2>
  <button class="rounded-lg bg-orange-armenian px-4 py-2 text-white hover:brightness-95">
    Cliquer
  </button>
</div>
```

#### ❌ NE PAS FAIRE : Utiliser les valeurs arbitraires

```astro
<!-- INTERDIT : Valeurs arbitraires avec crochets -->
<div class="w-[347px] mt-[23px] text-[#1a2b3c]">
```

#### ❌ NE PAS FAIRE : Utiliser les styles inline

```astro
<!-- INTERDIT : Styles inline -->
<div style="margin-top: 23px; color: #1a2b3c;">
```

### Animations

#### 1. D'abord : Animations Tailwind natives

```astro
<div class="animate-pulse">Chargement...</div>
```

#### 2. Ensuite : Transitions Tailwind

```astro
<button class="transition-colors duration-200 hover:bg-orange-600">
  Survolez-moi
</button>
```

#### 3. Si nécessaire : Keyframes dans `global.css`

Le projet utilise déjà des animations custom (`fade-in`, `services-reveal`) définies dans `global.css`. Respecter le pattern existant et inclure `prefers-reduced-motion`.

### Palette de couleurs (Thème Arménien)

Définies dans `global.css` via `@theme` :

- **Orange** : `orange-armenian` (`#F2A800`) — CTAs, accents principaux
- **Rouge** : `red-armenian` (`#D90012`) — Accents secondaires
- **Bleu** : `blue-armenian` (`#0033A0`) — Accents tertiaires
- **Fond** : `gray-900`, `gray-100` (sections alternées)
- **Texte** : `gray-900` (titres), `gray-600` (corps), `white` (sur fond sombre)

---

## Déploiement

### GitHub Pages

Le workflow `.github/workflows/deploy.yml` build et déploie sur push vers `main`.

1. **Repository** → **Settings** → **Pages** : source **GitHub Actions**
2. Configurer `site` et `base` dans `astro.config.mjs`
3. **Settings** → **Secrets and variables** → **Actions** : ajouter **`PUBLIC_CONTACT_FORM_URL`** et **`PUBLIC_CONTACT_FORM_TOKEN`** (le workflow les injecte au `pnpm run build`)

Le formulaire de contact nécessite **`PUBLIC_CONTACT_FORM_URL`** (ex. `https://contentforge.1344.fr/api/v1/send_form`) et **`PUBLIC_CONTACT_FORM_TOKEN`** dans `.env` (secrets GitHub Actions pour le déploiement). ContentForge doit autoriser le site en **CORS**.

### Domaine personnalisé

Pour utiliser un domaine personnalisé :

1. Configurer le domaine dans les paramètres GitHub Pages
2. Mettre à jour `astro.config.mjs` :
   ```javascript
   const site = 'https://arm-services-demenagement.fr';
   const base = '/';
   ```

---

## Commandes

| Commande | Action |
|----------|--------|
| `pnpm install` | Installer les dépendances |
| `pnpm dev` | Démarrer le serveur de dev |
| `pnpm build` | Build production → `dist/` |
| `pnpm preview` | Prévisualiser le build |
| `pnpm astro add [integration]` | Ajouter une intégration Astro |

---

## Documentation

- [Documentation Astro](https://docs.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [GitHub Pages Deployment](https://docs.astro.build/en/guides/deploy/github/)

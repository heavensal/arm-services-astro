# Multilang sur un site vitrine

Règle obligatoire pour Codex, Claude, Cursor et GitHub Copilot.
Lire ce fichier avant toute modification de langue, d’URL, de slug, de hreflang, de sitemap ou de page légale.

ARM Services est le cas « une seule langue ». Le dépôt sait aussi produire un site « plusieurs langues ». Les deux cas partagent le même code. Ce qui change, c’est ce que le site **publie**.

## Concept

Un site vitrine est le site public (ici Astro). Il affiche. Il n’est pas le CMS.
ContentForge, dans l’autre dépôt, rédige le blog, la FAQ et les avis. Le site vitrine les récupère au build, seulement si le flag du bloc est `true`. Hero, services, processus, zones, pages légales, téléphone et devis restent dans ce dépôt.

Le modèle de langue est prêt pour le français et l’anglais. Chaque site choisit combien de langues il publie.

- Le code, les noms de composants et les noms de variables restent en anglais : `TermsArticle`, `PrivacyArticle`, `legalSlugs`.
- Le texte visible vient de `src/i18n/locales/fr.json` ou `en.json`, via `getFixedT(locale)`.
- L’URL publique est dans la langue de la page. Un slug est un mot d’adresse : minuscules, traits d’union, sans accent, sans majuscule.

`en.json` peut exister alors que le site ne publie que le français. Le fichier prépare l’anglais. Il ne crée pas d’URL `/en/`.

Le français est la langue par défaut. Il vit à la racine. Il n’y a pas de préfixe `/fr/`.
L’anglais, quand il est publié, vit sous `/en/`.

## Les deux interrupteurs

Les deux doivent être d’accord. N’en activer qu’un seul.

| Interrupteur | Où | Rôle |
|---|---|---|
| `publishedLocales` | `src/site.config.ts` | Langues que le site annonce. hreflang, Open Graph et JSON-LD `inLanguage` ne citent que cette liste. |
| `ENABLE_MULTILANG` | `.env`, lu par `isMultilangEnabled()` | `true` génère les pages `/en/` et affiche le sélecteur de langue. `false` n’en génère aucune. |

`isPublishedLocale('en')` n’est vrai que si les deux sont actifs : `'en'` est dans `publishedLocales` **et** `ENABLE_MULTILANG=true`.

| Site | `publishedLocales` | `ENABLE_MULTILANG` |
|---|---|---|
| Une langue (ARM Services aujourd’hui) | `['fr']` | `false` |
| Plusieurs langues | `['fr', 'en']` | `true` |

## Une langue

ARM Services publie uniquement le français.

Attendu :

- Aucune URL `/en/`. Ni accueil, ni page légale, ni blog.
- Le sélecteur de langue du hero est absent.
- Le sitemap ne contient que des URL françaises.
- hreflang : `fr` et `x-default`, les deux vers l’URL française de la page. Pas de `hreflang="en"`.
- Pas de `og:locale:alternate`. JSON-LD `inLanguage` : `fr-FR` seulement.
- Le pied de page et les canoniques utilisent le slug français.
- `src/pages/en/[...slug].astro` retourne une liste vide. Le fichier reste dans le dépôt pour le jour où l’anglais est activé.

Pages légales publiques :

| Page | Fichier de route | URL |
|---|---|---|
| Mentions légales | `src/pages/mentions-legales.astro` | `/mentions-legales/` |
| Politique de confidentialité | `src/pages/politique-de-confidentialite.astro` | `/politique-de-confidentialite/` |
| Conditions générales | `src/pages/conditions-generales.astro` | `/conditions-generales/` |

Les composants restent `LegalNoticeArticle`, `PrivacyArticle`, `TermsArticle`.

Ces URL ne doivent pas exister comme pages françaises :

- `/legal-notice/`
- `/privacy-policy/`
- `/terms-of-service/`

Elles redirigent vers le slug français (`astro.config.mjs`, statut 301). La redirection reste en place même le jour où l’anglais est ajouté, parce que l’anglais n’occupe pas la racine : il occupe `/en/`.

## Plusieurs langues

Activer les deux interrupteurs ensemble. Le site publie alors le français à la racine et l’anglais sous `/en/`.

Attendu :

- `/` et `/en/` : la même accueil, chaque fois dans sa langue.
- Le sélecteur de langue est visible.
- hreflang cite `fr`, `en` et `x-default`. `x-default` répète l’URL française, langue par défaut du site.
- `og:locale:alternate` cite l’autre langue.
- Chaque page pointe vers sa traduction réelle. Une traduction absente n’est pas annoncée.
- Le sitemap contient les URL françaises et les URL `/en/` générées.

Le slug suit la langue de la page. La page française garde son slug français. La page anglaise reçoit le slug anglais, sous `/en/`.

| Page | Français | Anglais |
|---|---|---|
| Accueil | `/` | `/en/` |
| Mentions légales | `/mentions-legales/` | `/en/legal-notice/` |
| Politique de confidentialité | `/politique-de-confidentialite/` | `/en/privacy-policy/` |
| Conditions générales | `/conditions-generales/` | `/en/terms-of-service/` |

Les slugs sont dans `legalSlugs` (`src/lib/paths.ts`). Les liens passent par `legalPath(locale, page)` : le préfixe `en/` n’est ajouté que si l’anglais est publié.

Exemple. La politique de confidentialité française est `/politique-de-confidentialite/`. Le jour où l’anglais est publié, la traduction est `/en/privacy-policy/`. L’URL française ne devient pas `/privacy-policy/`.

## Blog

Le blog n’est pas une page du dépôt. Il est généré seulement si `CONTENTFORGE_ARTICLES_ENABLED=true` et si la langue est publiée.

- Français : `/blog` et `/blog/{slug}`.
- Anglais : `/en/blog` et `/en/blog/{slug}`, et seulement si l’anglais est publié.
- Un article présent dans une seule langue n’annonce pas l’autre dans le hreflang.

Sur ARM Services les trois flags ContentForge restent `false`. Aucune URL `/blog` n’est générée. Le segment `blog` est le même dans les deux langues. Le slug d’article est celui renvoyé par ContentForge.

## Ce qu’il ne faut pas faire

- Publier `/privacy-policy/`, `/legal-notice/` ou `/terms-of-service/` à la racine d’un site seulement français.
- Générer une page `/en/` parce que `en.json` existe, ou parce que le composant a un prop `locale`.
- Annoncer `hreflang="en"`, un lien `/en/`, ou `og:locale:alternate` tant que l’anglais n’est pas publié.
- Traduire les noms de fichiers de composants (`TermsArticle` reste `TermsArticle`).
- Préfixer le français avec `/fr/`.
- Rediriger `/en/privacy-policy` vers le français. Ce chemin est réservé à la page anglaise.
- Activer `ENABLE_MULTILANG` sans ajouter `'en'` à `publishedLocales`, ou l’inverse.
- Mettre une majuscule ou un accent dans un slug. `Politique-de-confidentialité` n’est pas une URL. L’URL est `/politique-de-confidentialite/`.

## Fichiers

| Fichier | Rôle |
|---|---|
| `src/site.config.ts` | `publishedLocales`, langue par défaut |
| `.env` | `ENABLE_MULTILANG` |
| `src/i18n/i18n.ts` | `isMultilangEnabled()`, `getFixedT(locale)` |
| `src/lib/paths.ts` | `legalSlugs`, `legalPath`, préfixe `en/` |
| `src/lib/seo.ts` | hreflang, canonique, Open Graph, JSON-LD |
| `src/pages/*.astro` | Routes françaises, le nom du fichier est le slug |
| `src/pages/en/[...slug].astro` | Routes anglaises, générées seulement si le flag est `true` |
| `src/components/LanguageSwitcher.astro` | Sélecteur, rendu seulement si le flag est `true` |
| `astro.config.mjs` | Redirections des anciens slugs anglais vers les slugs français |

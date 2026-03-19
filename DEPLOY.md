# Déploiement site Astro statique sur VPS (Nginx)

Site **100 % statique** (Astro + Tailwind → HTML/CSS/JS). Aucune API, base de données ni Node en production.

## Architecture

```
[Build local]  →  pnpm build  →  dist/
                                      ↓
[VPS]          ←  rsync dist/  ←  deploy.sh
                    ↓
               /var/www/arm-services/   (fichiers statiques)
                    ↓
               Nginx sert les fichiers (port 9000)
```

- **En production** : uniquement des fichiers statiques + Nginx. Pas de Docker, pas de runtime Node.
- **Nginx** sert directement le contenu de `dist/` (après déploiement = contenu de `/var/www/arm-services/`).

## Structure recommandée sur le VPS

VPS avec plusieurs applications (Rails, etc.) et Nginx en reverse proxy :

```
/var/www/
├── arm-services/          ← site Astro (contenu de dist/)
│   ├── index.html
│   ├── assets/
│   └── ...
├── autre-app-rails/       ← autres projets
└── ...
```

Nginx peut avoir par exemple :

- Un **server** dédié pour ce site sur le port 9000 (fichier fourni `nginx.conf`).
- Ou un **server_name** (domaine) sur 80/443 avec `root /var/www/arm-services;` et le même `location /` + cache.

Le fichier `nginx.conf` à la racine du repo est un **bloc serveur** à intégrer dans votre config Nginx existante.

## Configuration Nginx (une seule fois)

### Option A : Site sur le port 9000

Sur le VPS, créer un fichier de config (ex. `/etc/nginx/sites-available/arm-services`) :

```nginx
server {
    listen 9000;
    listen [::]:9000;
    server_name _;

    root /var/www/arm-services;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Puis :

```bash
sudo ln -s /etc/nginx/sites-available/arm-services /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Ouvrir le port si besoin : `sudo ufw allow 9000/tcp && sudo ufw reload`

### Option B : Site derrière le reverse proxy (sous un domaine ou path)

Si Nginx écoute déjà sur 80/443 et route vers d’autres apps, ajouter un bloc pour ce site, par exemple :

- **Sous-domaine** `astro.mondomaine.com` → `server { server_name astro...; root /var/www/arm-services; ... }`
- **Path** `location /site-astro/ { alias /var/www/arm-services/; ... }` (nécessite alors `base` ou `site` dans la config Astro si les assets doivent être sous ce path).

Le même `location /` avec `try_files` et le bloc de cache reste valable.

## Workflow de déploiement

1. **En local** : `./deploy.sh`
   - Lance `pnpm build` (génère `dist/`)
   - Envoie le contenu de `dist/` sur le VPS dans `VPS_WEB_ROOT` (défaut : `/var/www/arm-services`)

2. **Sur le VPS** : Nginx sert déjà ce répertoire. Aucun service à redémarrer après un déploiement (fichiers remplacés à la volée).

Variables optionnelles :

- `VPS_USER` (défaut : `ubuntu`)
- `VPS_HOST` (défaut : `51.75.124.208`)
- `VPS_WEB_ROOT` (défaut : `/var/www/arm-services`) — doit correspondre au `root` dans Nginx

## Bonnes pratiques (site statique + multi-apps)

- **Un répertoire par site** sous `/var/www/` (ou équivalent) pour garder les apps séparées.
- **Pas de Node ni de process long** pour ce site : Nginx seul suffit.
- **Cache long** sur les assets (js, css, images, fonts) via les en-têtes déjà présents dans le bloc `location ~* \.(js|css|...)`.
- **try_files** avec `$uri.html` et `/index.html` pour le routing côté client (SPA / pages Astro).
- **rsync --delete** : le déploiement remplace tout le contenu de la cible, donc pas de fichiers obsolètes après un build.

## Résumé

| Étape              | Où      | Action                          |
|--------------------|---------|----------------------------------|
| Build               | Local   | `pnpm build` → `dist/`          |
| Déploiement         | Local   | `./deploy.sh` (rsync vers VPS)  |
| Service des fichiers| VPS     | Nginx, `root /var/www/arm-services` |
| Port (ex. proposé)  | VPS     | 9000 (ou 80/443 avec server_name)  |

Site accessible par exemple sur **<http://51.75.124.208:9000>** (ou l’URL de votre domaine si configurée).

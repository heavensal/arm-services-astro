#!/usr/bin/env bash
set -e

VPS_USER="${VPS_USER:-ubuntu}"
VPS_HOST="${VPS_HOST:-51.75.124.208}"
# Répertoire sur le VPS où Nginx sert les fichiers statiques (contenu de dist/)
VPS_WEB_ROOT="${VPS_WEB_ROOT:-/var/www/arm-services}"

echo "Build Astro (sortie statique dans dist/)..."
pnpm build

echo "Sync dist/ vers le VPS..."
ssh "${VPS_USER}@${VPS_HOST}" "mkdir -p ${VPS_WEB_ROOT}"
rsync -avz --delete dist/ "${VPS_USER}@${VPS_HOST}:${VPS_WEB_ROOT}/"

echo "Déploiement terminé. Site servi par Nginx sur http://${VPS_HOST}:9000"
echo "Pensez à configurer Nginx une fois (voir DEPLOY.md)."

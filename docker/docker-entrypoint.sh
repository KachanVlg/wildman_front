#!/usr/bin/env sh
set -eu

ENV_JS="/usr/share/nginx/html/env.js"
TEMPLATE="/usr/share/nginx/html/env.template.js"

if [ -f "$TEMPLATE" ]; then
  API_BASE_URL="${API_BASE_URL:-}"
  sed "s|__API_BASE_URL__|${API_BASE_URL}|g" "$TEMPLATE" > "$ENV_JS"
fi

exec "$@"

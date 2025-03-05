# ─────────────────────────────────────────────────────────────────
# Proxy - Nginix + Let's Encrypt / Certbot
# ─────────────────────────────────────────────────────────────────

# From  https://github.com/JonasAlfredsson/docker-nginx-certbot/blob/f407a990292f2696260d3f49abab537b56a81f86/README.md#build-it-yourself
# and https://youtu.be/YMBT1NguJJw?si=r1Svq0FSWlpjnDsu
FROM jonasal/nginx-certbot:5.4.1-nginx1.27.4-alpine AS base
# Copy the static Nginx config files
COPY conf.d/* /etc/nginx/conf.d/

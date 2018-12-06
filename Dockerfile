FROM abiosoft/caddy:latest

COPY _site/ /srv
COPY Caddyfile /etc/Caddyfile

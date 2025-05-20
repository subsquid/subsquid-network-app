FROM nginx

COPY nginx/templates/default.conf.template /etc/nginx/templates/default.conf.template
COPY build/ /usr/share/nginx/html/

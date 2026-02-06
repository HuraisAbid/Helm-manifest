FROM nginx:1.25-alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Create non-root user
RUN addgroup -g 1001 nginxgroup \
 && adduser -D -u 1001 -G nginxgroup nginxuser

# Create all required directories and set permissions
RUN mkdir -p \
      /var/cache/nginx \
      /var/run/nginx \
      /var/log/nginx \
      /usr/share/nginx/html \
      /usr/share/nginx/html/assets \
      /etc/nginx/conf.d \
 && chown -R nginxuser:nginxgroup \
      /var/cache/nginx \
      /var/run/nginx \
      /var/log/nginx \
      /usr/share/nginx/html \
      /usr/share/nginx/html/assets \
      /etc/nginx

# Copy files
COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /usr/share/nginx/html/index.html

# Switch to non-root
USER nginxuser

EXPOSE 8080

HEALTHCHECK CMD wget -qO- http://localhost:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]

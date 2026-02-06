FROM nginx:1.25-alpine

# Remove default config
RUN rm -f /etc/nginx/conf.d/default.conf

# Create non-root user
RUN addgroup -g 1001 nginxgroup \
 && adduser -D -u 1001 -G nginxgroup nginxuser

# Create all writable directories for NGINX and mark them writable
RUN mkdir -p /var/cache/nginx/client_temp \
             /var/cache/nginx/proxy_temp \
             /var/cache/nginx/fastcgi_temp \
             /var/cache/nginx/uwsgi_temp \
             /var/cache/nginx/scgi_temp \
             /var/run/nginx \
             /usr/share/nginx/html \
             /etc/nginx \
    && chown -R nginxuser:nginxgroup /var/cache/nginx /var/run/nginx /usr/share/nginx/html /etc/nginx \
    && chmod -R 755 /var/cache/nginx /var/run/nginx /usr/share/nginx/html /etc/nginx

# Copy configuration and HTML files
COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /usr/share/nginx/html/index.html

# Switch to non-root user
USER nginxuser

EXPOSE 8080

# Healthcheck
HEALTHCHECK CMD wget -qO- http://localhost:8080/health || exit 1

# Run NGINX with custom PID in writable directory
CMD ["nginx", "-g", "pid /var/run/nginx/nginx.pid; daemon off;"]

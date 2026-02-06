FROM nginx:1.25-alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Create non-root user
RUN addgroup -g 1001 nginxgroup \
 && adduser -D -u 1001 -G nginxgroup nginxuser

# Create a single "catch-all" writable folder
RUN mkdir -p /nginx-data \
 && chown -R nginxuser:nginxgroup /nginx-data \
 && chmod -R 755 /nginx-data

# Also fix NGINX default cache/temp dirs (just in case)
RUN mkdir -p /var/cache/nginx /var/run \
 && chown -R nginxuser:nginxgroup /var/cache/nginx /var/run

# Copy files
COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /usr/share/nginx/html/index.html

# Switch to non-root
USER nginxuser

EXPOSE 8080

# HEALTHCHECK
HEALTHCHECK CMD wget -qO- http://localhost:8080/health || exit 1

# Start NGINX, tell it to use our catch-all folder for temp/cache
CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]

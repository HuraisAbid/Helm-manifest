FROM nginx:1.25-alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Create non-root user
RUN addgroup -g 1001 nginxgroup \
 && adduser -D -u 1001 -G nginxgroup nginxuser

# Create required NGINX writable directories
RUN mkdir -p /var/cache/nginx/client_temp \
 && mkdir -p /var/run \
 && chown -R nginxuser:nginxgroup /var/cache/nginx /var/run /usr/share/nginx/html /etc/nginx

# Copy files
COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /usr/share/nginx/html/index.html

# Switch to non-root
USER nginxuser

EXPOSE 8080

HEALTHCHECK CMD wget -qO- http://localhost:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]

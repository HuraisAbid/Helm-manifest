FROM nginx:1.25-alpine

# Remove default config
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy configuration and HTML files
COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /usr/share/nginx/html/index.html

# Switch to non-root user (default NGINX user is fine)
USER nginx

EXPOSE 8080

# Healthcheck
HEALTHCHECK CMD wget -qO- http://localhost:8080/health || exit 1

# Run NGINX
CMD ["nginx", "-g", "daemon off;"]

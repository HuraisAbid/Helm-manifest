FROM nginx:1.25-alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Create non-root user
RUN addgroup -g 1001 nginxgroup \
 && adduser -D -u 1001 -G nginxgroup nginxuser

# Copy files
COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /usr/share/nginx/html/index.html

# Change ownership
RUN chown -R nginxuser:nginxgroup /usr/share/nginx/html /etc/nginx

# Switch to non-root
USER nginxuser

EXPOSE 8080

HEALTHCHECK CMD wget -qO- http://localhost:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]


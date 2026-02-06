FROM node:18-alpine

# Create non-root user
RUN addgroup -g 1001 appgroup \
 && adduser -D -u 1001 -G appgroup appuser

WORKDIR /app

COPY package.json ./
RUN npm install --only=production

COPY index.js .

USER appuser

EXPOSE 3000

HEALTHCHECK CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "index.js"]


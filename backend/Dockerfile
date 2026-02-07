FROM node:18-slim

# Create non-root user
RUN groupadd -g 1001 appgroup \
 && useradd -u 1001 -g appgroup -m appuser

WORKDIR /app

# Copy only package files first (better cache)
COPY package.json package-lock.json* ./

# Install production deps (stable flags)
RUN npm install --omit=dev --no-audit --no-fund

COPY index.js .

USER appuser

EXPOSE 3000

HEALTHCHECK CMD node -e "require('http').get('http://localhost:3000/health',res=>process.exit(res.statusCode===200?0:1)).on('error',()=>process.exit(1))"

CMD ["node", "index.js"]

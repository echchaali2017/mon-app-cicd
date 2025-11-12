# Build stage
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:18-alpine AS production
WORKDIR /usr/src/app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

# Copy from builder
COPY --from=builder --chown=nodeuser:nodejs /usr/src/app/node_modules ./node_modules
COPY --chown=nodeuser:nodejs . .

USER nodeuser

# Environment variables
ENV NODE_ENV=production
ENV APP_NAME="Mon App CI/CD Pro"
ENV APP_VERSION="2.0.0"

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/v1/health || exit 1

# Use direct node command instead of npm start
CMD ["node", "src/app.js"]

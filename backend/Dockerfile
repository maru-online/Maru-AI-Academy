# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies (only)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy built app from builder stage
COPY --from=builder /app/dist ./dist

# Environment setup
ENV NODE_ENV=production
ENV PORT=8080

# Security: Run as non-root user
USER node

EXPOSE 8080

CMD ["node", "dist/index.js"]

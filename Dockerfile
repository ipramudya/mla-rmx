FROM node:18-alpine AS base

# BASE
FROM base as deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# PRODUCTION
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build && npm cache clean --force

# RUN
FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 remix
COPY --from=builder /app .
USER remix
EXPOSE 3000
ENV NODE_ENV production
CMD ["npm", "run", "start"]
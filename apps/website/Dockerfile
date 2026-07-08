# Build context is the repo root: docker build -f apps/website/Dockerfile .
# syntax=docker/dockerfile:1
ARG NPM_REGISTRY=https://package-mirror.liara.ir/repository/npm/

FROM docker.arvancloud.ir/library/node:22-alpine AS base
ARG NPM_REGISTRY
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@11.8.0 --registry=$NPM_REGISTRY

FROM base AS deps
ARG NPM_REGISTRY
WORKDIR /app
RUN pnpm config set registry $NPM_REGISTRY
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/website/package.json ./apps/website/package.json
COPY packages ./packages
RUN --mount=type=cache,target=/pnpm-store \
    pnpm install --prefer-frozen-lockfile --store-dir=/pnpm-store

FROM base AS builder
WORKDIR /app
COPY --from=deps /app ./
COPY . .
RUN pnpm --filter @kiawosch/website build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/website/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/website/.next/static ./apps/website/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/website/public ./apps/website/public

USER nextjs
EXPOSE $PORT

CMD ["node", "apps/website/server.js"]

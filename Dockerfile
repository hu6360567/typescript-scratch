# ==========================================
# Stage 1: Base
# ==========================================
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# ==========================================
# Stage 2: Dependencies
# ==========================================
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ==========================================
# Stage 3: Build
# ==========================================
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ==========================================
# Stage 4: Production Dependencies
# ==========================================
FROM base AS prod-deps
COPY package.json pnpm-lock.yaml ./
# 只安装生产环境需要的依赖，排除 eslint, vitest, typescript 等
RUN pnpm install --prod --frozen-lockfile

# ==========================================
# Stage 5: Runner
# ==========================================
FROM base AS runner
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY --from=prod-deps /app/node_modules ./node_modules

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# 切换到非 root 用户
USER nodejs

# EXPOSE 3000

CMD ["node", "dist/index.js"]
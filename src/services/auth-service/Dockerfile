FROM node:24-alpine

WORKDIR /app

# Copy dependency files trước
COPY package.json pnpm-lock.yaml ./

# Cài pnpm và dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source code và config còn lại
COPY tsconfig.json ./
COPY src ./src

# Build app
RUN pnpm run build

# Default command (tùy)
CMD ["pnpm", "start"]

EXPOSE 3001

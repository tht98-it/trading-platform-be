# Sử dụng node:24-alpine
FROM node:24-alpine

WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Enable pnpm qua corepack
RUN corepack enable && corepack prepare pnpm --activate

# Cài dependencies
RUN pnpm install --frozen-lockfile

# Copy source code và config
COPY tsconfig.json ./
COPY src ./src

# Build app
RUN pnpm run build && ls -la dist  # Kiểm tra thư mục dist

# Expose port 3000 (khớp với docker-compose.yml)
EXPOSE 8080

# Default command
CMD ["pnpm", "start"]
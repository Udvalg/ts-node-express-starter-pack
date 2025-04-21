FROM node:22-alpine3.20 as base
WORKDIR /home/node/app
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .

FROM node:22-alpine3.20 as builder
WORKDIR /home/node/app
COPY --from=base /home/node/app ./


RUN pnpm run build

FROM node:22-alpine3.20 as production
WORKDIR /home/node/app
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/.env .env
COPY package* pnpm-lock.yaml ./
RUN pnpm install --production=true

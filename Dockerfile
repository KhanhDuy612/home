FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

COPY .env.test .env
ENV NODE_ENV=test

RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

ENV PORT=3014

# Sao chép các tệp cần thiết
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./.env

EXPOSE 3014

CMD ["npm", "start"]
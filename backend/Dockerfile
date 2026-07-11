FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./

RUN npm install --production

COPY backend/ ./

EXPOSE 10000

ENV NODE_OPTIONS=--openssl-legacy-provider
ENV NODE_ENV=production

CMD ["npm", "start"]

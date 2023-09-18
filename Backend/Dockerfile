FROM node:18-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn

RUN mkdir -p /app/public/uploads && \
    chown -R node:node /app/public/uploads && \
    chmod -R 777 /app/public/uploads

COPY . .

RUN apk add --no-cache mongodb-tools

ENV MONGODB_URI=${MONGODB_URI}

USER root

CMD ["node", "index.js"]

EXPOSE 3000
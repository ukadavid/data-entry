FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["node", "index.js"]

EXPOSE 3000
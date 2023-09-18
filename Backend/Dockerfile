FROM node:alpine

RUN apk add --no-cache bash

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

RUN . ~/.nvm/nvm.sh && nvm install 14.20.1 && nvm alias default 14.20.1

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]

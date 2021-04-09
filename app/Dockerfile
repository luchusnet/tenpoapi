FROM node:alpine 
LABEL maintainer="benitezluciano@gmail.com"

ARG node_env
ENV NODE_ENV=local

RUN apk add --no-cache bash gawk sed grep bc coreutils

WORKDIR /app

ADD . /app

WORKDIR /app

RUN pwd

RUN npm prune

RUN npm install

EXPOSE 3000

CMD ["node", "./server/server.js"]
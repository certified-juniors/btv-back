FROM node:20.8.0-alpine3.18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]
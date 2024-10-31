FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY index.js index.js

ENV PORT=3002

EXPOSE 3002

CMD [ "npm", "start" ]
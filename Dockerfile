FROM node:16.15-alpine

WORKDIR /usr/src/app

COPY --chown=node:node package*.json  ./

RUN npm install

COPY --chown=node:node . .

EXPOSE ${PORT}

CMD [ "npm", "run", "start:dev"]

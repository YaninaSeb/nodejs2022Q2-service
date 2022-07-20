FROM node:16.15-alpine

EXPOSE ${PORT}

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "run", "start:dev"]

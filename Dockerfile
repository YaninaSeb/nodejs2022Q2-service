FROM node:16.15-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .
COPY .env.example .env

EXPOSE 4000
CMD [ "npm", "run", "start:dev"]

#  Dockerfile for Node Express Backend api (development)

# Use an official Node.js runtime as the base image
FROM node:20

ARG NODE_ENV=development

# Create App Directory
RUN mkdir -p /auth-app/src/app
WORKDIR /auth-app/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install

# Copy app source code
COPY . .

# Exports
EXPOSE 3000

CMD ["npm","start"]

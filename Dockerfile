#  Dockerfile for Node Express Backend api (development)

# Use an official Node.js runtime as the base image
FROM node:alpine

# Create App Directory
WORKDIR /auth-app/src/app
ENV NODE_ENV=development

# Install Dependencies
COPY package*.json ./

RUN npm ci

# Copy app source code
COPY . .

# Exports
EXPOSE 3000

CMD ["npm","run", "start"]

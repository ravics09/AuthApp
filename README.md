# Auth App

## Overview

This is a nodejs-based backend app utilizing typescript. Adding functionality for signin and signout, token generation, password reset.

## Setup and Uses

1. Clone the repository:
git clone https://github.com/ravics09/AuthApp.git

2. Install dependencies:
npm install

3. To run this application
npm start

4. To check swagger ui documentaion open below url:
http://localhost:8000/swagger/openapi

## Setup Docker:
Install docker desktop 

run below command
docker login

run below command
docker build -t <docker_profile_username>/auth-app:0.0.1.RELEASE .

run below command
 docker container run -d -p 3000:8000 <docker_profile_username>/auth-app:0.0.1.RELEASE

To check for any error run below command 
docker logs <docker_profile_username>/auth-app:0.0.1.RELEASE

To run docker compose file run below command
docker-compose up --build

Now you will be able to access server on 
http://localhot:3000


## Technologies Used:
Node.js
TypeScript
Express (if applicable)
Other libraries or tools

## License
Open Source

Hire Me:
ravisharmacs09@gmail.com
+91-8817147753
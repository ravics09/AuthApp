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

Login to docker using below command
docker login


To run docker compose file run below command
docker-compose up --d

To check for any error run below command 
docker logs <docker_profile_username>/auth-app:0.0.1.RELEASE


If container is running successfully then you will be able to access server on 
http://localhot:3000
http://localhost:3000/swagger/openapi#/

if you are running node server locally using below command 
npm start

then you can access swagger ui on below url
http://localhost:8000/swagger/openapi#/


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
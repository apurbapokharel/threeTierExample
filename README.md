# 3 Tier Implementaion via MERN
Done as an academic project for the subject Internet and Intranet.

## Description
* The project contains two directories one with the REST API built via Node and Express, 
* The other directory contains a simple React UI built using Materail-UI and interacts with the REST API via Axios,
* The database cluster is maintained at MongoDb Atlas,
* Jwt is used for authenticating the tokens and limiting the session time.

## Installation
* For running the project, first add your own MongoDB Atlas cluster url and jwt token password in the .env file inside the **firstRestAPI** folder with names *connectionURL2* and *tokenpassword*,
* Cd into each of the two folder and **npm install** and **npm start** them, 
* The REST API url is assumed to be at locallost 3000 in my code.

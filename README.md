## credentials-app
In this repo I have created the restful api using nodejs, express and mongo

### Author : Bhagyesh Patel

### `MySQL configuration`
Please create database `credentials`.
 and execute `setup.sh` file.

In the project directory, you can run:

### `npm install`

This will install the dependencies inside `node_modules`

### `node server.js` OR `nodemon start` OR `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:9030](http://localhost:9030) to view it in the browser.

### Install using Docker

### Create Image
`docker build -f docker/Dockerfile -t credential:1.0.0 .`

### Create Container
If Mysql is locally Installed
`docker-compose -f docker/docker-compose.yml up -d`

If not, then
`docker-compose -f docker/docker-compose-full.yml up -d`


`mongoimport --db credentials --collection socials --file ./socials`
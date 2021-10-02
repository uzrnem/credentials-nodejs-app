const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const credentials = require('./credential.controller.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', express.static('public'));

// Connecting to the database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/credentials', {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.post('/credentials/:model', credentials.create);
app.get('/credentials/:model', credentials.findAll);
app.get('/credentials/:model/:credentialId', credentials.findOne);
app.put('/credentials/:model/:credentialId', credentials.update);
app.delete('/credentials/:model/:credentialId', credentials.delete);

// listen for requests
app.listen(9030, () => {  console.log("Server is listening on port 9030"); });

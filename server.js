const express = require('express');
const bodyParser = require('body-parser');
// create express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', express.static('public'));

// Configuring the database
const dbConfig = require('./database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

require('./credential.routes.js')(app);

// listen for requests
app.listen(9011, () => {  console.log("Server is listening on port 9011"); });

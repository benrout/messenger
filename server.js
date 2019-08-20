const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Use dotenv to read .env variables into Node
require('dotenv').config();

const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@node-messenger-uchpv.gcp.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(dbUrl, err => {
    console.log("Mongodb connected", err);
});

const Message = mongoose.model('Message', { name: String, message: String });

const server = app.listen(3000, () => {
    console.log("Server is running on port", server.address().port);
});
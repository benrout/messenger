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

mongoose.connect(dbUrl, { useNewUrlParser: true }, err => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Mongodb connected");
    }

});

const MessageSchema = new mongoose.Schema({ name: String, message: String })
const MessageModel = mongoose.model('Message', MessageSchema);

app.get('/messages', (req, res) => {
    MessageModel.find({}, (err, messages) => {
        res.send(messages);
    })
})

app.post('/messages', (req, res) => {
    const message = new MessageModel(req.body);
    console.log(message);
    message.save(err => {
        if (err) {
            res.sendStatus(500);
        }
        res.sendStatus(200);
    })
})

const server = app.listen(3000, () => {
    console.log("Server is running on port", server.address().port);
});
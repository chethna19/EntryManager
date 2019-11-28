var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require('body-parser');
var socketio = require('socket.io');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/entrymanagement', {useNewUrlParser: true, useUnifiedTopology: true});

var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/entrymanager', require('./routes/entry'));

app.use(function(req, res, next){
    res.render('notFound');
  });

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening to port number " + port);
});
// MAIN entry point

var express = require('express');
var app = express();
var db = require('./database');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


// GET Home Page
app.get('/', function(req, res) {
    res.render('index');
});

app.listen(port);

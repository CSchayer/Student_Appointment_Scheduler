// MAIN

var express = require('express');
var app = express();
var db = require('./database');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


// GET Home Page
app.get('/', function(req, res) {
    res.render('index');
});

//GET Advisor Page
app.get('/advisor', function(req, res) {
    res.render('advisor.html');
});

app.listen(port);


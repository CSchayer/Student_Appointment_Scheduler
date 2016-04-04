// MAIN

var express = require('express');
var app = express();
var db = require('./database');
var Advisor = require('./models/advisorModel');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


// GET Home Page
app.get('/', function(req, res) {
    res.render('index');
});

// GET Advisor Page
app.get('/advisor', function(req, res) {
    res.render('advisor.html');
});

// GET Student Page
app.get('/student', function(req, res) {
    res.render('student.html');
});


//
// TEST ENVIRONMENTS
//

// GET Chris Gore Test Page
app.get('/test/cg', function(req,res) {
    res.render('test-chris-gore.html');
});

// GET Madeline Test Page
app.get('/test/mm', function(req, res) {
    res.render('test-madeline.html');
});

// GET Chris Schayer Test Page
app.get('/test/cs', function(req, res) {
    res.render('test-chris-schayer.html');
});

// GET James Test Page
app.get('/test/js', function(req, res) {
    res.render('test-james.html');
});


app.listen(port);


// MAIN

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./server/database');
var api = require('./server/routes/api');
var Advisor = require('./models/advisorModel');
var Appointment = require('./models/appointmentModel');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


// GET API
api(app);


// GET Routes

// Home Page
app.get('/', function(req, res) {
    res.render('index');
});

// Advisor Page
app.get('/advisor', function(req, res) {
    res.render('advisor.html');
});

// Student Page
app.get('/student', function(req, res) {
    res.render('student.html');
});

// Advisor Login Page
app.get('/advisor/login', function(req,res) {
    res.render('advisor-sign-in.html');
});


// Starts the server on port 3000
app.listen(port, function() {
    console.log("App listening on port " + port);
});


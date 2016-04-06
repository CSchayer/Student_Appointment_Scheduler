// MAIN

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./database');
var Advisor = require('./models/advisorModel');
var Appointment = require('./models/appointmentModel');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


//
// GET Routes
// ----------------------------------------

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

// Show all the advisors in the database (test page)
app.get('/advisorlist', function(req, res) {
    var query = Advisor.find({});
    query.exec(function(err, advisors) {
        if (err)
            res.send(err);
        res.json(advisors);
    })
});


//
// POST Routes
// ---------------------------------------------

// Add advisor to the database (test page)
app.post('/advisorlist', function(req, res) {
    // Create a new advisor
    var newAdvisor = new Advisor(req.body);

    // Save the new advisor in the database
    newAdvisor.save(function(err) {
        if (err)
            res.send(err);

        // Display new user
        res.json(req.body);
    });
});


// Add appointment
app.post('/student', function(req, res) {
    // Create a new appointment
    var newAppt = new Appointment(req.body);

    // Save the new appointment in the database
    newAppt.save(function(err) {
        if (err)
            res.send(err);
    });
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

// Starts the server on port 3000
app.listen(port);


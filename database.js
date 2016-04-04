// Database connection
// Not currently using this file in the app.
// It can be required in the main app.js
// by adding:
// var db = require('./database')

var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.getDbConnectionString());

var db = mongoose.connection;

module.exports = db;

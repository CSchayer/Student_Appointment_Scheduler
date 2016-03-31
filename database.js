// Database connection

var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.getDbConnectionString());

var db = mongoose.connection;

module.exports = db;

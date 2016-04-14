// Database Schema for Advisors

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var advisorSchema = new Schema({
    username: String,
    password: String,
    name: String,
    week: [{
        day: String,
        available: [String],
        unavailable: [String]
    }]
});

var Advisor = mongoose.model('Advisor', advisorSchema);

module.exports = Advisor;

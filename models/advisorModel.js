// Database Schema for Advisors

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var advisorSchema = new Schema({
    username: String,
    password: String,
    name: String,
    available: [{
        day: String,
        time: [String],
        unavailable: [String]
    }]
});

var Advisor = mongoose.model('Advisor', advisorSchema);

module.exports = Advisor;

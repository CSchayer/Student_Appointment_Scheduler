// Database Schema for Appointments

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var appointmentSchema = new Schema({
    day: Date,
    time: String,
    reason: String,
    advisor: String
});

var Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
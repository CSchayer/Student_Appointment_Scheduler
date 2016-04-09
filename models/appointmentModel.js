// Database Schema for Appointments

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var appointmentSchema = new Schema({
    day: String,
    time: String,
    service: String,
    advisor: String,
    student: String,
    studentEmail: String
});

var Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

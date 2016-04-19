// API

var Advisor = require('../../models/advisorModel');
var Appointment = require('../../models/appointmentModel');
var bodyParser = require('body-parser');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    // GET Routes

    // Get an advisor by their name
    app.get('/api/advisor/:name', function(req, res) {
        Advisor.find({ name: req.params.name }, function(err, advisor) {
            if (err) throw err;

            res.send(advisor);
        });
    });

    // Show all the advisors in the database
    app.get('/api/advisorlist', function(req, res) {
        var query = Advisor.find({});
        query.exec(function(err, advisors) {
            if (err)
                res.send(err);
            res.send(advisors);
        });
    });

    // Show only the names of the advisors in the database
    app.get('/api/advisornames', function(req, res) {
        var query = Advisor.find({});
        query.exec(function(err, advisors) {
            if (err)
                res.send(err);

            var names = [];
            advisors.forEach(function(advisor) {
                names.push(advisor.name);
            });
            res.send(names);
        });
    });

    // Show available times for an advisor
    app.get('/api/advisor/availabletimes/:name', function(req, res) {
        var query = Advisor.find({name: req.params.name});
        query.exec(function(err, advisor) {
            if (err) res.send(err);

            var times = [];


            advisor.forEach(function(advisor) {
               times.push(advisor.week);
            });
            res.send(times);
        });
    });


    // Show all the appointments in the database
    app.get('/api/appointmentlist', function(req, res) {
        var query = Appointment.find({});
        query.exec(function(err, appointment) {
            if (err)
                res.send(err);
            res.json(appointment);
        })
    });

    // Get all apointments for specific advisor
    app.get('/api/appointmentbyadvisor/:name', function(req, res) {
        Appointment.find({ advisor: req.params.name }, function(err, advisor) {
            if (err) throw err;

            res.send(advisor);
        });
    });


    // POST Routes

    // Add advisor to the database
    app.post('/api/advisor/add', function(req, res) {
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


    // Add an appointment to the database
    app.post('/api/appointment/add', function(req, res) {

        var day = new Date(req.body.day);
        var time = req.body.time;
        var found  = false;

        // Since we are currently using only the day name, this converts a date object to its day name
        var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayName = weekday[day.getDay()];


        Advisor.find({ name: req.body.advisor }, function(err, advisor) {
            if (err) throw err;

            // Finds the day name for the advisor and looks for that time in available
            // times. If it finds it, it moves the time to the unavailable array
            advisor[0].week.forEach(function(item) {
                if (item.day === dayName && item.available.indexOf(time) > -1) {
                    moveTimes(item.available, item.unavailable, time);
                    found = true;
                }
            });

            // Save the updated advisor information
            if (found) {
                advisor[0].save(function(err) {
                    if (err)
                        res.send(err);
                    else
                        console.log('Advisor times updated');
                });
                // Create a new appointment
                var newAppt = new Appointment(req.body);

                // Save the new appointment in the database
                newAppt.save(function(err) {
                    if (err)
                        res.send(err);
                    res.send("added " + newAppt);
                });
            }
            else {
                res.send("Time slot was not available");
            }
        });
    });


    // DELETE Routes

    // Delete an appointment from the database
    app.delete('/api/appointment/delete', function(req, res) {
        Appointment.findByIdAndRemove(req.body._id, function(err, appointment) {
            if (err) throw err;
            if (appointment === null) {
                res.send("Error: Appointment ID not found")
            }
            else {
                res.send("Deleted \n" + appointment);
            }
        });
    });

};


// Finds and removes a time from one array and puts it in another
function moveTimes(available, unavailable, time) {
    var i = available.indexOf(time);
    unavailable.push(available[i]);
    available.splice(i,1);
}

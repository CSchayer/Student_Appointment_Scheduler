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

    app.get('/api/task/:id', function(req, res) {
        Tasks.findById({ _id: req.params.id }, function(err, task) {
            if (err) throw err;

            res.send(task);
        });
    });


    // POST Routes

    // Add advisor to the database (test page)
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


    // Add appointment
    app.post('/student/add/appointment', function(req, res) {
        // Create a new appointment
        var newAppt = new Appointment(req.body);

        // Save the new appointment in the database
        newAppt.save(function(err) {
            if (err)
                res.send(err);
        });
    });









    app.post('/api/tasks', function(req, res) {
        if (req.body.id) {
            Tasks.findByIdAndUpdate(req.body.id, { task: req.body.task, isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment }, function(err, task) {
                if (err) throw err;
                res.send("Updated");
            });
        }
        else {
            var newTask = Task(
                {
                    uname: "test",
                    task: req.body.task,
                    isDone: req.body.isDone,
                    hasAttachmet: req.body.hasAttachment
                });
            newTask.save(function(err) {
                if (err) throw err;
                res.send("Saved");
            });
        }
    });

    app.delete('/api/tasks', function(req, res) {
        Tasks.findByIdAndRemove(req.body.id, function(err) {
            if (err) throw err;
            res.send("Deleted");
        });
    });
}

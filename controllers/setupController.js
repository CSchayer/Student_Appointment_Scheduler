// This seeds the database with test data
// It was run once to set up the database

var Advisor = require('../models/advisorSchema');

module.exports = function(app) {

    app.get('/api/setup', function(req, res) {

        var starterAdvisors = [
            {
                username: 'test',
                password: 'test',
                name: 'test'
            },
            {
                username: 'test2',
                password: 'test2',
                name: 'test2'
            },
            {
                username: 'test3',
                password: 'test3',
                name: 'test3'
            }
        ];

        var starterAppointments =
            {
                day: Date.now(),
                time: '1200',
                reason: 'testing',
                advisor: 'test'
            };

        Advisor.create(starterAdvisors, function(err, results) {
            res.send(results);
        });
    });
};
// Angular modules for Advisor calendar

angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap']);
angular
    .module('mwl.calendar.docs') //you will need to declare your module with the dependencies ['mwl.calendar', 'ui.bootstrap', 'ngAnimate']
    .controller('KitchenSinkCtrl', function(moment, alert, $http) {


        var vm = this;

        //These variables MUST be set as a minimum for the calendar to work
        vm.calendarView = 'month';
        vm.viewDate = new Date();
        vm.events = [
        ];

        ////////////////////////////////////////////////////////////////////////

        var name = 'John Doe';
        var appointments = [];
        var dates = [];

        // Adds minutes to a datetime object
        function addMinutes(date, minutes) {
            return new Date(date.getTime() + minutes*60000);
        }

        // Used to show current and future appointments on calendar
        function showAppointment(date) {
            var today = new Date();

            if (date < today) {
                return false;
            }
            else {
                return true;
            }
        }

        // GET all appointments for an adivsor from the API
        $http.get('/api/appointmentbyadvisor/' + name).then(function(response) {

            response.data.forEach(function(entry) {
                appointments.push(entry);
            });
            console.log(appointments);


            appointments.forEach(function(appt, index) {
                dates.push(new Date(appt.day + ' ' + appt.time));


                if (showAppointment(dates[index])) {
                    vm.events.push({
                        title: appt.student,
                        service: appt.service,
                        studentEmail: appt.studentEmail,
                        type: 'important',
                        startsAt: dates[index],
                        endsAt: addMinutes(dates[index],30)
                    });
                }

            });
            console.log(dates);

            console.log(vm.events);

        });

        ////////////////////////////////////////////////////////////////////////

        vm.isCellOpen = true;

        vm.eventClicked = function(event) {
            alert.show('Clicked', event);
        };

        vm.eventEdited = function(event) {
            alert.show('Edited', event);
        };

        vm.eventDeleted = function(event) {
            alert.show('Deleted', event);
        };

        vm.eventTimesChanged = function(event) {
            alert.show('Dropped or resized', event);
        };

        vm.toggle = function($event, field, event) {
            $event.preventDefault();
            $event.stopPropagation();
            event[field] = !event[field];
        };

    });

angular
    .module('mwl.calendar.docs')
    .factory('alert', function($uibModal) {

        function show(action, event) {
            return $uibModal.open({
                templateUrl: 'modalContent.html',
                controller: function() {
                    var vm = this;
                    vm.action = action;
                    vm.event = event;
                },
                controllerAs: 'vm'
            });
        }

        return {
            show: show
        };

    });
// Angular modules for Advisor calendar

angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap']);
angular
    .module('mwl.calendar.docs') //you will need to declare your module with the dependencies ['mwl.calendar', 'ui.bootstrap', 'ngAnimate']
    .controller('KitchenSinkCtrl', function(moment, alert) {

        var vm = this;

        //These variables MUST be set as a minimum for the calendar to work
        vm.calendarView = 'month';
        vm.viewDate = new Date();
        vm.events = [
        ];

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
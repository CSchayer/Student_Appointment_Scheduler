// AngularJS for the Student page

var app = angular.module('student', []);

app.controller('selectOptions', function($scope) {
    $scope.advisorList = [
        {name: 'John Doe'},
        {name: 'Jane Doe'}
    ];
});
// Javascript for James's Test Page

var app = angular.module('test', []);

app.controller('MainCtrl', function($scope, $http) {
    $scope.posts = [
        {title: 'post1', upvotes: 5},
        {title: 'post2', upvotes: 1},
        {title: 'post3', upvotes: 23},
        {title: 'post4', upvotes: 4},
        {title: 'post5', upvotes: 7}
    ];

    $scope.addPost = function() {
        if(!$scope.title || $scope.title === "") return;
        $scope.posts.push({
            title: $scope.title,
            link: $scope.link,
            upvotes: 0}
        );
        $scope.title = "";
        $scope.link = "";
    };

    $scope.incrementUpvotes = function (post) {
        post.upvotes += 1;
    };



    // AJAX requests

    // GET all appointments
    $http.get('/api/appointmentlist').then(function(response) {
        console.log("All appointments:");
        console.log(response.data);
    });

    // GET all appointments for specific advisor
    var name = "John Doe"

    $http.get('/api/appointmentbyadvisor/' + name).then(function(response) {
        console.log("Appointments for " + name);
        console.log(response.data);
    });

    var idToDelete = {
        "_id": "570db60be996733605aed4c8"
    };
    // Needs to be fixed
    $http.delete('/api/appointment/delete', idToDelete).then(function(response) {
        console.log(response.data);
    });


    // POST a new appointment

    var jsonData = {
        "day": "4/26/16",
        "time": "8:00 AM",
        "service": "Other",
        "advisor": "John Doe",
        "student": "Jill Jones",
        "studentEmail": "jill@gmail.com"
    };

    // I'm commenting this out because it will add this appointment every time it is run
    // but this is a simple example of how it's done
    //$http.post('/api/appointment/add', jsonData).then(function(response) {
    //    console.log(response.data);
    //});

});


// Javascript for James's Test Page

var app = angular.module('test', []);

app.controller('MainCtrl', function($scope) {
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

    });


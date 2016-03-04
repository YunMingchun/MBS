var myboys = angular.module('myboys', ['ngCookies', 'ngRoute', 'ngSanitize', 'ng.ueditor']);

myboys.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);
}]);

myboys.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/blog/add', {
            templateUrl: 'blogs/add',
            controller: blogAddCtrl
        }).
        when('/blog/list', {
            templateUrl: 'blogs/list',
            controller: blogListCtrl
        });
}]);
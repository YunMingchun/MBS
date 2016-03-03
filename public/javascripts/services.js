/**
 * Created by ymc on 1/26/16.
 */

var myboys = angular.module('myboys', ['ngCookies']);

myboys.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
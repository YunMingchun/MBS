/**
 * Created by ymc on 1/26/16.
 */

myboys.controller('registerCtrl', function($scope, $http){
    $scope.userName = '';
    $scope.password = '';
    $scope.repasswd = '';

    $scope.signup = function(){
        if(!$scope.password == $scope.repasswd){
            return;
        }
        $http.post('/users/api/register', {
            userName: $scope.userName,
            password: $scope.password
        }).success(function(resp){
            if(resp.status == 0){}
            else {}
        });
    };
    $scope.back2up = function(){}
});
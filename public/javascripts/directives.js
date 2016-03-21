myboys.directive('menu', function () {
    return {
        restrict: 'E',
        templateUrl: '/components/menu',
        replace: true,
        controller: function ($scope, $cookies, $location) {
            $scope.userId = $cookies.userId;
            $scope.display_mode = !$scope.userId ? 'visitor' : 'user';
            $scope.menu_items = [
                {name: 'My Story', url: '/blog/list'},
                {name: 'Drafts', url: ''},
                {name: 'Messages', url: ''},
                {name: 'Profile', url: ''},
                {name: 'Setting', url: ''},
                {name: 'logout', url: '/login'}
            ];

            $scope.toggleMenu = function () {
                $scope.menuIsDisplay = !$scope.menuIsDisplay;
            };
            $scope.jump2Other = function (url) {
                window.location.href = url;
            };
            $scope.jump2Login = function () {
                window.location.href = '/login';
            };
        }
    }
});
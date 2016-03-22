myboys.directive('menu', function () {
    return {
        restrict: 'E',
        templateUrl: '/components/menu',
        replace: true,
        controller: function ($scope, $cookies, $location) {
            $scope.menu_items = [
                {name: 'My Story', url: '/blogs/list'},
                {name: 'Drafts', url: '/blogs/draft'},
                {name: 'Messages', url: '#'},
                {name: 'Profile', url: '#'},
                {name: 'Setting', url: '#'},
                {name: 'logout', url: '/login'}
            ];

            $scope.toggleMenu = function () {
                $scope.menuIsDisplay = !$scope.menuIsDisplay;
            };
            $scope.jump2Other = function (url) {
                window.location.href = url;
            };
        }
    }
});
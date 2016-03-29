myboys.directive('menu', function () {
    return {
        restrict: 'E',
        templateUrl: '/components/menu',
        replace: true,
        controller: function ($scope) {
            $scope.menu_items = [
                {name: 'My Story', url: '/blogs/list'},
                {name: 'Drafts', url: '#'},
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

myboys.directive('blogHeader', function () {
    return {
        restrict: 'E',
        templateUrl: '/components/blogHeader',
        replace: true,
        controller: function ($scope) {
            $scope.isBlogNavDisplay = false;
            $scope.back2Home = function () {
                window.location.href = '/';
            };
            $scope.jump2Other = function (url) {
                window.location.href = '/blogs/' + url;
            };
        }
    }
});

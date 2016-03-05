myboys.directive('menu', function () {
    return {
        restrict: 'E',
        templateUrl: '/components/menu',
        replace: true,
        controller: function ($scope, $cookies, $location) {
            $scope.userName = $cookies.userName;
            $scope.menu_items = [
                {
                    name: '博客',
                    path: 'blog',
                    sub_menu_items: [
                        {name: '推荐日志'},
                        {name: '热门日志'},
                        {name: '我的日志', url: '/blog/list'},
                        {name: '添加日志', url: '/blog/add'},
                        {name: '草稿箱'},
                        {name: '设置'}
                    ]
                },
                {
                    name: '用户',
                    sub_menu_items: [
                        {name: '资料编辑'}
                    ]
                },
                {
                    name: '系统',
                    sub_menu_items: [
                        {name: '设置'},
                        {name: '注销'}
                    ]
                }
            ];


            angular.forEach($scope.menu_items, function (data, index, array) {
                if ($location.path().indexOf(data.path) >= 0) {
                    $scope.current_menu_item = index;
                    $scope.sub_menu_items = $scope.menu_items[index].sub_menu_items;
                }
            });
            angular.forEach($scope.sub_menu_items, function (data, index, array) {
                if ($location.path() == data.url) {
                    $scope.current_sub_menu_item = index;
                }
            });

            $scope.displayMenuItem = function (index) {
                $scope.current_menu_item = index;
                $scope.sub_menu_items = $scope.menu_items[index].sub_menu_items;
                $location.path($scope.sub_menu_items[0].url);
            };
            $scope.displaySubMenuItem = function (index) {
                $scope.current_sub_menu_item = index;
                $location.path($scope.sub_menu_items[index].url);
            };
        }
    }
});
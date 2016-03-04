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
            $scope.sub_menu_items = $scope.menu_items[0].sub_menu_items;
            $scope.current_menu_item = $cookies.current_menu_item ? $cookies.current_menu_item : 0;
            $scope.current_sub_menu_item = $cookies.current_sub_menu_item ? $cookies.current_sub_menu_item : 0;

            $scope.displayMenuItem = function (index) {
                $scope.current_menu_item = index;
                $scope.sub_menu_items = $scope.menu_items[index].sub_menu_items;
                $scope.current_sub_menu_item = 0;
                $cookies.current_menu_item = index;
            };
            $scope.displaySubMenuItem = function (index) {
                $scope.current_sub_menu_item = index;
                $cookies.current_sub_menu_item = index;
            };
        }
    }
});
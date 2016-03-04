myboys.controller('registerCtrl', function ($scope, $http, $location, $cookies) {
    $scope.userName = '';
    $scope.password = '';
    $scope.repasswd = '';
    $scope.email = '';

    $scope.register = function () {
        if ($scope.userName == '' || $scope.password == '' || $scope.email == '') {
            return;
        }
        if (!$scope.password == $scope.repasswd) {
            return;
        }
        $http.post('/users/api/register', {
            userName: $scope.userName,
            password: $scope.password,
            email: $scope.email
        }).success(function (resp) {
            if (resp.status == 0) {
                $cookies.userName = $scope.userName;
                $cookies.userId = resp.userId;

                window.location.href = '/';
            }
            else {
            }
        });
    };
    $scope.back2up = function () {
        var preUrl = decodeURIComponent($location.search()['preUrl']);
        if (preUrl != 'undefined') {
            window.location.href = preUrl;
        }
        else {
            window.location.href = '/login';
        }
    }
});

myboys.controller('loginCtrl', function ($scope, $http, $location, $cookies) {
    $scope.userName = '';
    $scope.password = '';

    $scope.signin = function () {
        if ($scope.userName == '' || $scope.password == '') {
            return;
        }
        $http.get('/users/api/login', {
            params: {
                userName: $scope.userName,
                password: $scope.password
            }
        }).success(function (resp) {
            if (resp.status == 0) {
                $cookies.userName = $scope.userName;
                $cookies.userId = resp.userId;

                window.location.href = '/';
            }
            else {
            }
        });

    };
    $scope.signup = function () {
        window.location.href = '/register?preUrl=' + encodeURIComponent($location.absUrl());
    }
});

myboys.controller('homeCtrl', function ($scope, $cookies, $location) {
    $scope.userId = $cookies.userId;
    if (!$scope.userId) {
        window.location.href = '/login';
    }
});

function blogAddCtrl($scope, $http) {
    $scope.title = '';
    $scope.options = [
        {name: '选择可见性', value: '0'},
        {name: '公开', value: 'public'},
        {name: '仅自己可见', value: 'private'}
    ];
    $scope.selected = '0';
    $scope.tagKey = '';
    $scope.tags = [];
    $scope.blogContent = '';
    $scope.config = {
        focus: true,
        autoFloatEnabled: true,
        initialFrameHeight: 500,
        initialFrameWidth: null
    };

    $scope.addTag = function (e) {
        if (e.keyCode == 13) {
            $scope.tags.push($scope.tagKey);
            $scope.tagKey = '';
        }
    };
    $scope.removeTag = function (index) {
        $scope.tags.splice(index, 1);
    };
    $scope.submit = function () {
        var privacy = ($scope.selected == '0' || $scope.selected == 'public') ? 'public' : 'private';
        var tags = $scope.tags.join(',');
        if ($scope.title == '') {
            return;
        }

        $http.post('/blogs/api/add', {
            userId: $scope.userId,
            title: $scope.title,
            privacy: privacy,
            tags: tags,
            content: $scope.blogContent,
            isPublished: 1
        }).success(function (resp) {
            window.location.href = '/blog/list';
        });

    };
    $scope.draft = function () {
    }
}

function blogListCtrl($scope) {

}
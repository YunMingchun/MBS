myboys.controller('registerCtrl', function ($scope, $http, $location, $cookies) {
    $scope.userName = '';
    $scope.password = '';
    $scope.repasswd = '';
    $scope.email = '';
    $scope.passwordType = 'password';

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
                alert(resp.msg);
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
    };
    $scope.displayPassword = function () {
        $scope.passwordIsDisplayed = !$scope.passwordIsDisplayed;
        $scope.passwordType = $scope.passwordType == 'password' ? 'text' : 'password';
    };
});

myboys.controller('loginCtrl', function ($scope, $http, $location, $cookies) {
    $scope.userName = '';
    $scope.password = '';

    $cookies.userName = '';
    $cookies.userId = '';

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
        window.location.href = 'register?preUrl=' + encodeURIComponent($location.absUrl());
    }
});

myboys.controller('homeCtrl', function ($scope, $cookies, $location) {
    $scope.userId = $cookies.userId;
    $scope.displayMode = !$scope.userId ? 'visitor' : 'user';
    $scope.trendingTab = 'Weekly';
    $scope.latestPosts = [{
        title: 'papi酱获逻辑思维、真格基金等联合投资1200万人民币',
        url: '#',
        createTime: '2016-03-19 17:09'
    }, {
        title: '6步熟悉一个行业',
        url: '#',
        createTime: '2016-03-19 17:09'
    }, {
        title: '雷军之前觉得机器战胜人类是时间问题，但被AlphGo整懵了',
        url: '#',
        createTime: '2016-03-19 17:09'
    }];
    $scope.trendingPosts = [{
        title: 'papi酱获逻辑思维、真格基金等联合投资1200万人民币',
        url: '#',
        createTime: '2016-03-19 17:09'
    }, {
        title: '6步熟悉一个行业',
        url: '#',
        createTime: '2016-03-19 17:09'
    }, {
        title: '雷军之前觉得机器战胜人类是时间问题，但被AlphGo整懵了',
        url: '#',
        createTime: '2016-03-19 17:09'
    }];
    $scope.featuredPosts = [{
        title: 'papi酱获逻辑思维、真格基金等联合投资1200万人民币',
        url: '#',
        createTime: '2016-03-19 17:09'
    }, {
        title: '6步熟悉一个行业',
        url: '#',
        createTime: '2016-03-19 17:09'
    }, {
        title: '雷军之前觉得机器战胜人类是时间问题，但被AlphGo整懵了',
        url: '#',
        createTime: '2016-03-19 17:09'
    }];
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
        height: 700,
        focus: true,
        airMode: false,
        toolbar: [
            ['edit', ['undo', 'redo']],
            ['headline', ['style']],
            ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
            ['fontface', ['fontname']],
            ['textsize', ['fontsize']],
            ['fontclr', ['color']],
            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video', 'hr']],
            ['view', ['fullscreen', 'codeview']],
            ['help', ['help']]
        ]
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

        var time = new Date();
        var year = time.getFullYear();
        var month = pad0(time.getMonth() + 1);
        var day = pad0(time.getDate());
        var hour = pad0(time.getHours());

        $http.post('/blogs/api/add', {
            userId: $scope.userId,
            title: $scope.title,
            privacy: privacy,
            tags: tags,
            content: $scope.blogContent,
            isPublished: 1,
            createTime: year + '-' + month + '-' + day + ':' + hour
        }).success(function (resp) {
            if (resp.status == 0) {
                window.location.href = '/blog/list';
            }
        });
    };
    $scope.draft = function () {
        var privacy = ($scope.selected == '0' || $scope.selected == 'public') ? 'public' : 'private';
        var tags = $scope.tags.join(',');
        if ($scope.title == '') {
            return;
        }

        var time = new Date();
        var year = time.getFullYear();
        var month = pad0(time.getMonth() + 1);
        var day = pad0(time.getDate());
        var hour = pad0(time.getHours());

        $http.post('/blogs/api/add', {
            userId: $scope.userId,
            title: $scope.title,
            privacy: privacy,
            tags: tags,
            content: $scope.blogContent,
            isPublished: 0,
            createTime: year + '-' + month + '-' + day + ':' + hour
        }).success(function (resp) {
            if (resp.status == 0) {
                window.location.href = '/blog/draft';
            }
        });
    }
}

function blogListCtrl($scope, $http, $location) {
    $http.get('/blogs/api/list', {
        params: {
            userId: $scope.userId
        }
    }).success(function (resp) {
        if (resp.status == 0) {
            $scope.posts = resp.posts;
        }
    });

    $scope.displayPost = function (id) {
        $location.path('/blog/post/' + id);
    };
    $scope.deletePost = function (id) {
        $http.post('/blogs/api/delete', {
            userId: $scope.userId,
            postId: id
        }).success(function (resp) {
            if (resp.status == 0) {
                window.location.href = '/blog/list';
            }
        });
    };
    $scope.editPost = function (id) {
        $location.path('/blog/edit/' + id);
    }
}

function blogRecCtrl($scope) {
}

function blogHotCtrl($scope) {
}

function postCtrl($scope, $routeParams, $http) {
    $scope.post = {};
    $http.get('/blogs/api/display', {
        params: {
            userId: $scope.userId,
            postId: $routeParams.id
        }
    }).success(function (resp) {
        if (resp.status == 0) {
            $scope.post = resp.post;
        }
    });
}

function postEditCtrl($scope, $http, $routeParams) {
    $scope.options = [
        {name: '公开', value: 'public'},
        {name: '仅自己可见', value: 'private'}
    ];
    $scope.config = {
        height: 700,
        focus: true,
        airMode: false,
        toolbar: [
            ['edit', ['undo', 'redo']],
            ['headline', ['style']],
            ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
            ['fontface', ['fontname']],
            ['textsize', ['fontsize']],
            ['fontclr', ['color']],
            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video', 'hr']],
            ['view', ['fullscreen', 'codeview']],
            ['help', ['help']]
        ]
    };

    $http.get('/blogs/api/display', {
        params: {
            userId: $scope.userId,
            postId: $routeParams.id
        }
    }).success(function (resp) {
        if (resp.status == 0) {
            $scope.title = resp.post.title;
            $scope.selected = resp.post.privacy;
            $scope.tags = resp.post.tags.split(',');
            $scope.blogContent = resp.post.content;
        }
    });

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
        var privacy = $scope.selected == 'public' ? 'public' : 'private';
        var tags = $scope.tags.join(',');
        if ($scope.title == '') {
            return;
        }

        var time = new Date();
        var year = time.getFullYear();
        var month = pad0(time.getMonth() + 1);
        var day = pad0(time.getDate());
        var hour = pad0(time.getHours());

        $http.post('/blogs/api/edit', {
            userId: $scope.userId,
            postId: $routeParams.id,
            title: $scope.title,
            privacy: privacy,
            tags: tags,
            content: $scope.blogContent,
            isPublished: 1,
            updateTime: year + '-' + month + '-' + day + ':' + hour
        }).success(function (resp) {
            if (resp.status == 0) {
                window.location.href = '/blog/post/' + $routeParams.id;
            }
        });
    };
    $scope.draft = function () {
        var privacy = $scope.selected == 'public' ? 'public' : 'private';
        var tags = $scope.tags.join(',');
        if ($scope.title == '') {
            return;
        }

        var time = new Date();
        var year = time.getFullYear();
        var month = pad0(time.getMonth() + 1);
        var day = pad0(time.getDate());
        var hour = pad0(time.getHours());

        $http.post('/blogs/api/edit', {
            userId: $scope.userId,
            postId: $routeParams.id,
            title: $scope.title,
            privacy: privacy,
            tags: tags,
            content: $scope.blogContent,
            isPublished: 0,
            updateTime: year + '-' + month + '-' + day + ':' + hour
        }).success(function (resp) {
            if (resp.status == 0) {
                window.location.href = '/blog/post/' + $routeParams.id;
            }
        });
    }
}

function blogDraftCtrl($scope, $http, $location) {
    $http.get('/blogs/api/list', {
        params: {
            userId: $scope.userId
        }
    }).success(function (resp) {
        if (resp.status == 0) {
            $scope.posts = resp.posts;
        }
    });

    $scope.displayPost = function (id) {
        $location.path('/blog/post/' + id);
    };
    $scope.deletePost = function (id) {
        $http.post('/blogs/api/delete', {
            userId: $scope.userId,
            postId: id
        }).success(function (resp) {
            if (resp.status == 0) {
                window.location.href = '/blog/list';
            }
        });
    };
    $scope.editPost = function (id) {
        $location.path('/blog/edit/' + id);
    }
}

/* Helper */
function pad0(num) {
    if (num.toString().length == 1) {
        return '0' + num;
    }
    else {
        return num;
    }
}
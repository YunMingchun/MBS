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
        title: '马克扎克伯格问马云：可以帮忙卖我们的VR产品吗？',
        url: '#'
    }, {
        title: '该来的总会来的：新闻业也有“按需经济”了',
        url: '#',
        createTime: '2016-03-19 17:09'
    }];
    $scope.featuredPosts = [{
        title: '钱有的是，好内容没处找；妈咪多小姐少，短视频投资也是这个命啊',
        url: '#',
        createTime: '2016-03-19 17:09',
        abstract: '最新消息，春节以来爆红的papi酱获得真格基金、逻辑思维等联合投资，总投资额达1200万人民币。',
        avatar: '/images/avatar1.jpg',
        username: '想太多小姐'
    }, {
        title: '内容为本，这件事情你们别忘了',
        url: '#',
        createTime: '2016-03-19 17:09',
        abstract: '腾讯网总编辑王永浩的一番言论，引来了大V曹林的不满，而且是强烈不满。王永志先生到底说了什么呢？',
        avatar: '/images/avatar2.jpg',
        username: '奔跑吧VR'
    }, {
        title: '大学开始创业，5年创业生涯教会了我什么',
        url: '#',
        createTime: '2016-03-19 17:09',
        abstract: '一些朋友和热心人士希望我在公司Gyanlab创业5周年之际能写点儿什么。',
        avatar: '/images/avatar3.jpg',
        username: '起啥名字好呢'
    }];
});

myboys.controller('blogListCtrl', function ($scope, $cookies, $http) {
    $scope.userId = $cookies.userId;
    $scope.userName = $cookies.userName;
    $scope.getBlogs = (function () {
        $http.get('/blogs/api/list', {
            params: {
                userId: $scope.userId
            }
        }).success(function (resp) {
            if (resp.status == 0) {
                $scope.posts = resp.posts;
            }
        });
    })();
    $scope.displayPost = function (id) {
        window.location.href = '/blogs?postId=' + id;
    };
});

myboys.controller('blogAddCtrl', function ($scope, $http, $cookies) {
    $scope.userId = $cookies.userId;
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
    $scope.abstract = '';
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
        if ($scope.title == '' || $scope.abstract == '') {
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
            createTime: year + '-' + month + '-' + day + ':' + hour,
            abstract: $scope.abstract
        }).success(function (resp) {
            if (resp.status == 0) {
                window.location.href = '/blogs/list';
            }
        });
    };
    $scope.draft = function () {
        var privacy = ($scope.selected == '0' || $scope.selected == 'public') ? 'public' : 'private';
        var tags = $scope.tags.join(',');
        if ($scope.title == '' || $scope.abstract == '') {
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
            createTime: year + '-' + month + '-' + day + ':' + hour,
            abstract: $scope.abstract
        }).success(function (resp) {
            if (resp.status == 0) {
                window.location.href = '/blogs/draft';
            }
        });
    }
});

myboys.controller('blogDisplayCtrl', function ($scope, $location, $http, $cookies) {
    $scope.post = {};
    $scope.userId = $cookies.userId;
    console.log($location.search());
    $scope.getPost = (function () {
        $http.get('/blogs/api/display', {
            params: {
                userId: $scope.userId,
                postId: $location.search().postId
            }
        }).success(function (resp) {
            if (resp.status == 0) {
                $scope.post = resp.post;
            }
        });
    })();
});

function blogListCtrlBackup($scope, $http, $location) {
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
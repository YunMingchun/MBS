var myboys = angular.module('myboys', ['ngCookies', 'ngRoute', 'ngSanitize']);

myboys.config(['$locationProvider', function ($locationProvider) {
    //$locationProvider.html5Mode(true);
}]);

myboys.config(['$routeProvider', function ($routeProvider) {
}]);

myboys.filter('privacy', function () {
    return function (input) {
        if (input) {
            switch (input) {
                case 'public':
                {
                    return '公开';
                    break;
                }
                case 'private':
                {
                    return '仅对自己可见';
                    break;
                }
            }
        }
    }
});

myboys.filter('tags', function () {
    return function (input) {
        if (input) {
            var tags = input.split(',');
            var tagsHtml = '';
            for (var i = 0; i < tags.length; i++) {
                tagsHtml += '<span class="tag">' + tags[i] + '</span>'
            }
            return tagsHtml;
        }
    }
});

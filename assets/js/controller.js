angular.module('johnsApp', ['ngRoute', 'angular-loading-bar']) //ngRoute is an angular service
//http://stackoverflow.com/questions/15449325/how-can-i-preserve-new-lines-in-an-angular-partial
.filter('newline', function($sce) {
    return function(text) {
        text = text.replace(/\n/g, '<br />');
        return $sce.trustAsHtml(text);
    }
})
// .config(function($locationProvider) {
//     $locationProvider.html5Mode(true);
// })
.config(function($routeProvider) {
    $routeProvider.when("/contact", {
        controller: "contactController",
        templateUrl: "assets/html/contact.html",
        title: "Contact John Lensing"
    });

    $routeProvider.when("/music", {
        controller: "musicController",
        templateUrl: "assets/html/music.html",
        title: "Meet John Lensing"
    });

    $routeProvider.when("/shows", {
        controller: "showsController",
        templateUrl: "assets/html/shows.html",
        title: "Shows - John Lensing"
    });

    $routeProvider.when("/lyrics", {
        controller: "lyricsController",
        templateUrl: "assets/html/lyrics.html",
        title: "Lyrics - John Lensing"
    });

    $routeProvider.otherwise({
        redirectTo: '/music'
    });
})

//taken from http://stackoverflow.com/questions/26308020/how-to-change-page-title-in-angular-using-routeprovider
.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.title;
    });
}]);

.service('Materialize', function() {
    return Materialize;
})

.factory('goto', function($location, $window, $timeout) {
    return function(path) {
        if (path.startsWith('/'))
            path = path.substring(1);
        $location.path(path);
        $timeout(function() {
            $window.$('ul.tabs').tabs();
        }, 500);
        window.scrollToID('#page-content');
    };
})

.controller('indexController', function($scope, $location, $route, goto) {
    window.ugh = function() {
        console.log($location, $route);
    }

    $scope.active = function(path) {
        return $location.path() == path.split('/').join('') ? 'active' : '';
    }

    window.goto = $scope.goto = goto;
})

.controller('contactController', function($scope, goto) {
    console.log('changed to contact page')
})

.controller('lyricsController', function($scope, $http) {
    console.log('changed to lyrics page');
    $scope.selectedLyric = {
        text: '',
        title: 'Please select a song'
    };
    $http.get('https://vps.boschwitz.me/johns/pub/get.php?p=lyrics').then(function(res) {
        console.log(res)
        $scope.data = res.data;
    });

    $scope.select = function(lyric) {
        $scope.selectedLyric = lyric;
    }
})

.controller('showsController', function($scope, $http) {
    console.log('changed to shows page');
    $scope.data = {};

    $http.get('https://vps.boschwitz.me/johns/pub/get.php?p=shows').then(function(res) {
        console.log(res)
        $scope.data = res.data;
    });
})

.controller('musicController', function($scope, goto) {
    console.log('changed to music page')
});

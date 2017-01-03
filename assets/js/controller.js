angular.module('johnsApp', ['ngRoute', 'angular-loading-bar']) //ngRoute is an angular service
    //http://stackoverflow.com/questions/15449325/how-can-i-preserve-new-lines-in-an-angular-partial
    .filter('newline', function($sce) {
        return function(text) {
            text = text.replace(/\n/g, '<br />');
            return $sce.trustAsHtml(text);
        }
    })
    .config(function($routeProvider) {
        $routeProvider.when("/contact", {
            controller: "contactController",
            templateUrl: "contact.html"
        });

        $routeProvider.when("/music", {
            controller: "musicController",
            templateUrl: "music.html"
        });

        $routeProvider.when("/shows", {
            controller: "showsController",
            templateUrl: "shows.html"
        });

        $routeProvider.when("/lyrics", {
            controller: "lyricsController",
            templateUrl: "lyrics.html"
        });

        $routeProvider.otherwise({
            redirectTo: '/home'
        });

    })

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
            text: ''
            ,title:'Please select a song'
        };
        $http.get('https://vps.boschwitz.me/johns/backend/get.php?p=lyrics').then(function(res) {
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

        $http.get('https://vps.boschwitz.me/johns/backend/get.php?p=shows').then(function(res) {
            console.log(res)
            $scope.data = res.data;
        });
    })

    .controller('musicController', function($scope, goto) {
        console.log('changed to music page')
    });

angular.module('johnsApp', ['ngRoute']) //ngRoute is an angular service
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

.controller('lyricsController', function($scope, goto) {
  console.log('changed to lyrics page')
})

.controller('showsController', function($scope, goto) {
  console.log('changed to shows page')
})

.controller('musicController', function($scope, goto) {
  console.log('changed to music page')
});

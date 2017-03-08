angular.module('johnsApp', ['ngRoute', 'angular-loading-bar']) //ngRoute is an angular service
    //http://stackoverflow.com/questions/15449325/how-can-i-preserve-new-lines-in-an-angular-partial
    .filter('newline', function($sce) {
        return function(text) {
            text = text.replace(/\n/g, '<br />');
            return $sce.trustAsHtml(text);
        }
    })

.filter('bbcode', function($sce) {
        return function(text) {
            var reg = /\[([a-z\-]*)\:([a-z\-\s]*)\]/ig;

            function replacer(match, key, value, offset, string) {
                switch (key) {
                    case 'faicon':
                        return '<i class="fa ' + value + '"></i>';
                    case 'mdicon':
                        return '<i class="mdi "';
                }
            }

            return $sce.trustAsHtml(text.replace(reg, replacer));
        };
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

        $routeProvider.when("/video", {
            controller: "videoController",
            templateUrl: "assets/html/video.html",
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

        $routeProvider.when("/blog", {
            controller: "blogController",
            templateUrl: "assets/html/blog.html",
            title: "Blog - John Lensing"
        });

        $routeProvider.when("/blog/:blogID", {
            controller: "viewBlogController",
            templateUrl: "assets/html/viewblog.html",
            title: "Blog - John Lensing"
        });

        $routeProvider.otherwise({
            redirectTo: '/music'
        });
    })

//taken from http://stackoverflow.com/questions/26308020/how-to-change-page-title-in-angular-using-routeprovider
.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.title;
        if (window.ga)
            ga('send', 'pageview', window.location.hash);
    });
}])

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

.controller('indexController', function($scope, $location, $route, goto, $window, $timeout) {
    var $ = $window.jQuery;
    window.ugh = function() {
        console.log($location, $route);
    }

    $scope.active = function(path) {
        return $location.path() == path ? 'active' : '';
    }

    $scope.scrollToTop = function() {
        $timeout(function() {
            $window.scrollTo(0, $window.innerHeight);
        }, 500);
    }

    $scope.menu = {
        mobile: {
            isOpen: false,
            style: {
                true: 'menu-swoop-in',
                false: 'menu-swoop-out'
            },
            toggle: function() {
                this.isOpen = !this.isOpen;
                if (this.isOpen) {
                    $('#mobile-menu-open').css('padding-left', $window.innerWidth - (window.innerWidth > 1000 ? 70 : 50)).css('padding-bottom', $window.innerHeight - 20).children().css('opacity', 0);
                } else {
                    $timeout(function() {
                        $('#mobile-menu-open').css('padding-bottom', '0').css('padding-left', '1rem').children().css('opacity', 1);
                    }, 700);
                }
            }
        },
        links: [{
            url: '/music',
            title: 'Music',
            hover: 'Listen to John Play'
        }, {
            url: '/video',
            title: 'Video',
            hover: 'Watch John Play'
        }, {
            url: '/shows',
            title: 'Shows',
            hover: 'See John Live'
        // }, {
        //     url: '/blog',
        //     title: 'Blog',
        //     hover: 'Read John\'s Thoughts'
        }, {
            url: '/lyrics',
            title: 'Lyrics',
            hover: 'Read and Sing along to John\'s music'
        }, {
            url: '/contact',
            title: 'Contact',
            hover: 'Talk to John'
        }, ]
    }
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

.controller('musicController', function($scope, $location) {
    console.log('changed to music page');
    console.log($location.path());
})

/* Blog Stuff */

.factory('loadBlogData', function($http) {
    return function() {
        var response;
        $http.get('localhost/backend/get.php?p=blogs').then(function(res) {
            console.log(res)
            response = res.data;
        });
        return response;
    };
})

.controller('blogController', function($scope, $http) {
    console.log('changed to blog page');

    $http.get('/backend/get.php?p=blogs').then(function(res) {
        console.log(res)
        $scope.data = res.data;

        $scope.blogs = [];
        for (var blogID in $scope.data) {
            var blog = $scope.data[blogID];
            blog.blogID = blogID;
            $scope.blogs.push(blog);
        }
    });
})

.controller('viewBlogController', function($scope, $route, loadBlogData, $http, $sce) {
    console.log('changed to view blog page');
    $scope.route = $route;

    // var data = loadBlogData();

    $scope.data = {};

    $scope.blog = {
        title: '404 - Not Found',
        content: $sce.trustAsHtml('This blog does not exist.')
    };

    $http.get('/backend/get.php?p=blogs').then(function(res) {
        console.log(res)
        $scope.data = res.data;
        if (!!$scope.data[$route.current.params.blogID]) {
            $scope.blog = $scope.data[$route.current.params.blogID];
            $scope.blog.content = $sce.trustAsHtml($scope.blog.content);
        }
    });



});

(function () {
    angular
        .module('MovieApp')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider

            // user routing
            .when('/', {
                templateUrl: 'home.html'
            })

            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })

            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerProjectController',
                controllerAs: 'model'
            })

            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            });
    }
    
    function checkLoggedIn($q, $location, userProjectService) {
        var deferred = $q.defer();
        userProjectService
            .checkLoggedIn()
            .then(function (currentUser) {
                console.log(currentUser);
                if (currentUser === '0'){
                    deferred.reject();
                    $location.url('/login');
                }else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }
})();

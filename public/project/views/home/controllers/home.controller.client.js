(function () {
    angular
        .module('MovieApp')
        .controller('homeController', homeController);

    function homeController(currentUser, homeService, userProjectService, $location) {
        var model = this;
        model.currentUser = currentUser;
        model.logout = logout;
        model.searchNewMovies = searchNewMovies;
        model.selectMovie = selectMovie;
        model.searchPage = searchPage;

        function init() {
            homeService
                .upcomingMovies()
                .then(function (response) {
                    model.upcomingMovies = response.data.results;
                });

            homeService
                .latestMovies()
                .then(function (response) {
                    model.latestMovies = response.data;
                });

            homeService
                .currentMovies()
                .then(function (response) {
                    model.currentMovies = response.data.results;
                });

            homeService
                .popularMovies()
                .then(function (response) {
                    model.popularMovies = response.data.results;
                });

            homeService
                .topRatedMovies()
                .then(function (response) {
                    model.topRatedMovies = response.data.results;
                });

        }
        init();

        function searchNewMovies(searchTerm) {
            homeService
                .searchNewMovies(searchTerm)
                .then(function (response) {
                    model.movies = response.data.results;
                });
        }

        function selectMovie(movieId) {
            $location.url('/page/' + movieId);
        }

        function searchPage(searchTerm) {
            $location.url('/search/' + searchTerm);
        }

        function logout() {
            userProjectService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

    }
})();
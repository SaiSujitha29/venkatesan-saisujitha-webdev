(function () {
    angular
        .module('MovieApp')
        .controller('homeController', homeController);

    function homeController(homeService, $location) {
        var model = this;

        model.searchNewMovies = searchNewMovies;
        model.selectMovie = selectMovie;

        function init() {
            homeService
                .upcomingMovies()
                .then(function (response) {
                    model.upcomingMovies = response.data.results;
                });

            homeService
                .latestMovies()
                .then(function (response) {
                    console.log(response.data);
                    model.latestMovies = response.data;
                });

            homeService
                .currentMovies()
                .then(function (response) {
                    model.currentMovies = response.data.results;
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

    }
})();

(function () {
    angular
        .module('MovieApp')
        .controller('homeController', homeController);

    function homeController(homeService, $location) {
        var model = this;

        model.searchNewMovies = searchNewMovies;
        model.selectMovie = selectMovie;

        function searchNewMovies(searchTerm) {
            homeService
                .searchNewMovies(searchTerm)
                .then(function (response) {
                    model.movies = response.data.results;
                })
        }

        function selectMovie(movieId) {
            $location.url('/page/' + movieId);
        }



    }
})();

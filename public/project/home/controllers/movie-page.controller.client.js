(function () {
    angular
        .module('MovieApp')
        .controller('movieController', movieController);

    function movieController($sce, $location, $routeParams, homeService) {
        var model = this;
        model.movieId = $routeParams['movieId'];

        function init() {
            homeService
                .searchMovieById(model.movieId)
                .then(function (response) {
                    model.movie = response.data;
                    model.genres = response.data.genres;
                    var path = model.movie.backdrop_path;
                    //model.path = response.data.backdrop_path;
                    //document.body.style.background = 'url(' + 'http://image.tmdb.org/t/p/original' + model.path + ') no-repeat top left';
                    //document.body.style.backgroundSize = 1;
                });

            homeService
                .searchCast(model.movieId)
                .then(function (response) {
                    model.casts = response.data.cast;
                });

            homeService
                .similarMovies(model.movieId)
                .then(function (response) {
                    var data = response.data.results;
                    model.similarMovie = [];
                    for(i =0; i < data.length; i++){
                        model.similarMovie.push(data[i]);
                    }
                });

            homeService
                .recommendedMovies(model.movieId)
                .then(function (response) {
                    var data = response.data.results;
                    model.recommendedMovie = [];
                    for(i =0; i < data.length; i++){
                        model.recommendedMovie.push(data[i]);
                    }
                })
        }
        init();

        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.selectMovie = selectMovie;

        function getYouTubeEmbedUrl() {
            return homeService
                .searchVideos(model.movieId)
                .then(function (response) {
                    model.videoKeys = response.data.results;
                })
        }

        function selectMovie(movieId) {
            $location.url('/page/' + movieId);
        }


    }

})();
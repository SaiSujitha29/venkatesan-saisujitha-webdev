(function () {
    angular
        .module('MovieApp')
        .controller('movieController', movieController);

    function movieController($sce, $location, $routeParams, homeService, $scope) {
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
                    temp = [];
                    var data = response.data.results;
                    for(i =0; i < data.length; i++){
                        temp.push(data[i]);
                    }
                    model.similarMovie = temp;
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




        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        var slides = $scope.slides = [];
        var currIndex = 0;

        $scope.addSlide = function(movie) {
            console.log(movie);
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: "http://image.tmdb.org/t/p/original" + movie.poster_path,
                text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
                id: currIndex++
            });
        };

        $scope.randomize = function() {
            var indexes = generateIndexesArray();
            assignNewIndexesToSlides(indexes);
        };

        console.log(model.similarMovie);

        // for(var i =0; i <= model.similarMovie.length; i++){
        //     $scope.addSlide(model.similarMovie[i]);
        // }
        for (i = 0; i < 5; i++) {
            var curr = model.similarMovie[i];
            console.log(curr);
            $scope.addSlide(model.similarMovie[i]);
        }

        // Randomize logic below

        function assignNewIndexesToSlides(indexes) {
            for (var i = 0, l = slides.length; i < l; i++) {
                slides[i].id = indexes.pop();
            }
        }

        function generateIndexesArray() {
            var indexes = [];
            for (var i = 0; i < currIndex; ++i) {
                indexes[i] = i;
            }
            return shuffle(indexes);
        }

        // http://stackoverflow.com/questions/962802#962890
        function shuffle(array) {
            var tmp, current, top = array.length;

            if (top) {
                while (--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = array[current];
                    array[current] = array[top];
                    array[top] = tmp;
                }
            }

            return array;
        }

    }

})();
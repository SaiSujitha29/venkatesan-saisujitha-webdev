(function () {
    angular
        .module('MovieApp')
        .controller('movieController', movieController);

    function movieController(currentUser, $sce, $location, $routeParams, homeService, $scope,
                             reviewProjectService,postProjectService) {
        var model = this;
        model.movieId = $routeParams['movieId'];
        model.loggedUser = currentUser;
        model.upcomingIndex = 1;
        model.createReview = createReview;
        model.canCreate = false;
        model.increaseUpcoming = function () {
            if(model.similarMovie.length <= model.upcomingIndex){
                model.upcomingIndex = 1;
            }
            else {
                model.upcomingIndex++;
            }
        };
        model.decreaseUpcoming = function () {
            if(model.upcomingIndex == 1){
                model.upcomingIndex = model.similarMovie.length;
            }
            else {
                model.upcomingIndex--;
            }
        };

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
                });

            reviewProjectService
                    .findReviewsByMovieId(model.movieId)
                    .then(function (response) {
                        console.log(response);
                        model.reviews = response;
                    });

            if(model.loggedUser._id) {
                model.canCreate = true;
            }
        }
        init();

        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.selectMovie = selectMovie;
        model.selectReview = selectReview;
        model.editReview = editReview;
        model.deleteReview = deleteReview;

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

        function editReview(review) {
            var reviewId = review._id;
            $location.url('/user/' + currentUser._id + '/movie/' + model.movieId + '/review/' + reviewId);
        }

        function createReview(review) {
            console.log(review);
            if(typeof review === 'undefined') {
                model.error = "Review name required!";
                return;
            }
            return reviewProjectService
                .createReview(model.loggedUser._id, model.movieId, review);
            $location.url('/test/page/'+model.movieId);
            // if(currentUser._id){
            //     $location.url('/user/'+ currentUser._id + '/movie/'+ movieId + '/review/new');
            //     }
            // else {
            //     model.message = "Please login to continue!!!"
            // }
        }

        function deleteReview(review) {

        }

        function selectReview(review) {
            console.log(review);
            reviewer = review._reviewer;
            var userId = reviewer._id;
            console.log(userId);
            $location.url('/user/'+ userId + '/profile-public');
        }

    }

})();
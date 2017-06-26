(function () {
    angular
        .module('MovieApp')
        .controller('movieController', movieController);

    function movieController(currentUser, $sce, $location, $routeParams, homeService, $scope,
                             reviewProjectService,postProjectService, $route) {

        var model = this;
        model.movieId = $routeParams['movieId'];
        model.loggedUser = currentUser;
        model.upcomingIndex = 1;
        model.canCreate = false;
        model.canEdit = false;
        model.canView = true;

        function init() {

            // movie data
            homeService
                .searchMovieById(model.movieId)
                .then(function (response) {
                    model.movie = response.data;
                    model.genres = response.data.genres;
                    var path = model.movie.backdrop_path;
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

            // reviews
            reviewProjectService
                    .findReviewsByMovieId(model.movieId)
                    .then(function (response) {
                        model.reviews = response;
                    });

            if(model.loggedUser._id) {
                var reviews = model.loggedUser.reviews;
                console.log(reviews.length === 0);
                if(reviews.length !== 0){
                    for(i = 0; i < reviews.length; i++){
                        var currReview = reviews[i];
                        console.log(model.movieId === currReview.movieId+'');
                        if(currReview.movieId+'' === model.movieId){
                            model.canCreate = false;
                            //model.canEdit = true;
                            break;
                        }
                        else {
                            model.canCreate = true;
                        }
                    }
                }
                else{
                    model.canCreate = true;
                }
            }
            console.log(model.canCreate);

            if(model.canEdit){
                reviewProjectService
                    .findMovieReviewByUserId(model.loggedUser._id,model.movieId);
                    // .then(function (response) {
                    //     console.log(response);
                    //     model.review = response;
                    // });
            }
        }
        init();

        model.createReview = createReview;
        model.selectMovie = selectMovie;
        model.selectReview = selectReview;
        model.editReview = editReview;
        model.deleteReview = deleteReview;
        model.updateReview = updateReview;

        // navigate to another movie page
        function selectMovie(movieId) {
            $location.url('/page/' + movieId);
        }

        // CRUD reviews
        function selectReview(review) {
            console.log(review);
            reviewer = review._reviewer;
            var userId = reviewer._id;
            console.log(userId);
            $location.url('/user/'+ userId + '/profile-public');
        }

        function createReview(review) {
            console.log(review);
            if(typeof review === 'undefined') {
                model.error = "Review name required!";
                return;
            }
            reviewProjectService
                .createReview(model.loggedUser._id, model.movieId, review)
                .then(function () {
                    model.canCreate = false;
                    //model.canEdit = true;
                    model.canView = false;
                    $route.reload();
                });
        }

        function editReview(review) {
            model.canEdit = true;
            model.review = review;
        }

        function updateReview(review) {

            var reviewId = review._id;

            reviewProjectService
                .updateReview(model.loggedUser._id, model.movieId, reviewId, review)
                .then(function (review) {
                    console.log(review);
                     model.message = "Review Updated Successfully";
                    $route.reload();
                });
        }

        function deleteReview(review) {
            console.log(review);
            var reviewId = review._id;

            reviewProjectService
                .deleteReview(model.loggedUser._id, model.movieId, reviewId, review)
                .then(function () {
                    model.message = "Review Deleted Successfully";
                    model.canCreate = true;
                    //model.canEdit = true;
                    model.canView = true;
                    $route.reload();
                });

        }

        //Posts

        $(document).on('change', '.div-toggle', function() {
            var target = $(this).data('target');
            var show = $("option:selected", this).data('show');
            $(target).children().addClass('hide');
            $(show).removeClass('hide');
        });
        $(document).ready(function(){
            $('.div-toggle').trigger('change');
        });

    }

})();
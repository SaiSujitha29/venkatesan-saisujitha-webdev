(function () {
    angular
        .module('MovieApp')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userProjectService, $routeParams, homeService) {


        var model = this;
        model.user = currentUser;
        var userId = currentUser._id;

        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logout = logout;
        model.selectMovie = selectMovie;
        model.selectFollower = selectFollower;

        function init(){
            model.reviews = currentUser.reviews;
        }
        init();

        function selectMovie(movieId) {
            $location.url('/page/' + movieId);
        }

        function selectFollower(follower) {
            var userId = follower._id;
            $location.url('/user/'+ userId + '/profile-public');
        }


        function updateUser(user) {
            userProjectService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User updated successfully!";
                });
        }


        function unregister() {
            userProjectService
                .unregister()
                .then(function () {
                    $location.url('/login');
                }, function (err) {
                    console.log(err);
                });
        }

        function logout() {
            userProjectService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
}) ();
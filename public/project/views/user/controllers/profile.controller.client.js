(function () {
    angular
        .module('MovieApp')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userProjectService, $routeParams, homeService, $sce) {


        var model = this;
        model.user = currentUser;
        model.userId = currentUser._id;

        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logout = logout;
        model.selectMovie = selectMovie;
        model.selectFollower = selectFollower;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.updatePassword = updatePassword;

        function init(){
            model.reviews = currentUser.reviews;
        }
        init();

        function selectMovie(movieId) {
            $location.url('/page/' + movieId);
        }

        function updatePassword(oldPwd, newPwd, verify) {
            if (oldPwd === null || oldPwd === '' || typeof oldPwd === 'undefined') {
                model.error = 'Please enter the current Password for verification';
                return;
            }

            if (newPwd === null || newPwd === '' || typeof newPwd === 'undefined') {
                model.error = 'New Password is required';
                return;
            }

            if (verify === null || verify === '' || typeof verify === 'undefined') {
                model.error = 'verify password is required';
                return;
            }

            if (newPwd !== verify) {
                console.log("not matching");
                model.error = "passwords must match";
                return;
            }
            var info = {
              oldPwd: oldPwd,
                newPwd: newPwd,
                verify: verify
            };
            userProjectService
                .updatePassword(model.userId, info)
                .then(function (response) {
                    console.log(response);
                })

        }

        function selectFollower(follower) {
            var userId = follower._id;
            $location.url('/user/'+ userId + '/profile-public');
        }

        function getYouTubeEmbedUrl(youtubeLink) {
            var embedUrl = "https://www.youtube.com/embed/";
            var youTubeLinkParts = youtubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
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
(function () {
    angular
        .module('MovieApp')
        .controller('userPublicProjectController', userPublicProjectController);

    function userPublicProjectController( currentUser, $location, userProjectService, $routeParams, $scope) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.loggedUser = currentUser;
        model.isfollow = false;

        function init(){

            userProjectService
                .findUserById(model.userId)
                .then(function (user) {
                    console.log(user);
                    model.user = user;
                });


            var following = currentUser.following;

            if(following){
                for(i = 0; i < following.length; i++){
                    var currfollower = following[i];
                    console.log("in here");
                    console.log(currfollower._id);
                    console.log(model.userId);
                    if(currfollower._id === model.userId){
                         model.isfollow = true;
                        break;
                    }
                }
            }
        }
        init();

        model.follow = follow;
        model.unfollow = unfollow;
        model.selectFollower = selectFollower;

        function selectFollower(follower) {
            var userId = follower._id;
            $location.url('/user/'+ userId + '/profile-public');
        }

        function follow(follow, follower) {
            userProjectService
                .followUser(follow, follower)
                .then(function (response) {
                    console.log(response);
                    init();
                });
             model.isfollow = true;
            $location.url('/user/'+ model.userId + '/profile-public');
        }

        function unfollow(follow, follower) {
            userProjectService
                .unfollowUser(follow, follower)
                .then(function (response) {
                    console.log(response);
                    init();
                });
            model.isfollow = false;
            $location.url('/user/'+ model.userId + '/profile-public');
        }
    }

})();
(function () {
    angular
        .module('MovieApp')
        .controller('userPublicProjectController', userPublicProjectController);

    function userPublicProjectController( currentUser, $location, userProjectService, $routeParams, $scope, $route) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.loggedUser = currentUser;
        model.isfollow = false;
        if (model.loggedUser !== 0){
            //model.followUsers = followUsers;
            //model.unfollowUsers = unfollowUsers;
        }

        model.follow = follow;
        model.unfollow = unfollow;

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

            console.log(model.isfollow);
        }
        init();

        model.selectFollower = selectFollower;

        function selectFollower(follower) {
            var userId = follower._id;
            $location.url('/user/'+ userId + '/profile-public');
        }

        function follow(follow, follower) {
            console.log("jefelnvkm");
            userProjectService
                .followUser(follow, follower)
                .then(function (response) {
                    console.log(response);
                    init();
                });
             model.isfollow = true;
             console.log("plsssssssssssssssssssssssssssssss");
             console.log(model.isfollow);
            $location.url('/user/'+ model.userId + '/profile-public');
        }

        function unfollow(follow, follower) {
            console.log("trying to unfollow");
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
(function () {
    angular
        .module('MovieApp')
        .controller('profileController', profileController);

    function profileController(currentUser,$location,userService, $routeParams) {

        var model = this;
        var userId = currentUser._id;
        model.user = currentUser;
        
        // event handlers
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        // implementation
        function updateUser(userId, user) {
            if (user.username === ""){
                model.message = "Username required";
                return;
            }
            userService
                .updateUser(userId, user)
                .then(function () {
                   model.message = "User updated successfully";
                }, function(error){

                });
        }

        function deleteUser(id) {
            userService
                .deleteUser(id)
                .then(function () {
                    $location.url('/');
                });
        }
        
        function logout() {
            userService
                .logout()
                .then(function () {
                        $location.url('/login');
                    }
                );
        }

    }
})();

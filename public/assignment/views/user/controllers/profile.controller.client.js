(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location,userService, $routeParams) {

        var model = this;
        var userId = $routeParams['userId'];

        userService
            .findUserById(userId)
            .then(renderUser);

        function renderUser(user) {
            model.user = user;
        }

        // event handlers
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        // implementation
        function updateUser(userId, user) {
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

    }
})();

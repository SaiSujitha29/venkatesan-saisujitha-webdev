(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location,userService, $routeParams) {

        var model = this;
        var userId = $routeParams['userId'];
        model.user = userService.findUserById(userId);

        // event handlers
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        // implementation
        function updateUser(userId, user) {
            userService.updateUser(userId, user);
        }

        function deleteUser(id) {
            console.log(id);
            userService.deleteUser(model.user._id);
            //userService.deleteUser(id);
            $location.url('/');
            console.log(userService.findUserByUsername('bob'));

        }

    }
})();

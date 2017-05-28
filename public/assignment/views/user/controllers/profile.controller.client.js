(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location,userService, $routeParams) {

        var model = this;
        var userId = $routeParams['userId'];
        model.user = userService.findUserById(userId);

        // event handlers
        model.updateUser = updateUser;

        // implementation
        function updateUser(userId, user) {
            userService.updateUser(userId, user);
        }

    }
})();

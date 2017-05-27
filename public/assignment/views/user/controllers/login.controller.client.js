(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        // event handlers
        model.login = login;

        // implementation
        function login(username, password) {

            var found = userService.findUserByCredentials(username, password);

            if (found !== null) {
                $location.url('/user/' + found._id);
            } else {
                model.message = "Username " + username + " not found, please try again";
            }
        }
    }
})();

(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        // event handlers
        model.login = login;

        // implementation
        function login(username, password) {

            var found = userService.findUserByUsername(username);
            var valid = userService.findUserByCredentials(username, password);

            if (found === null) {
                model.message = "Username " + username + " not found, please try again";
            } else if (valid === null) {
                model.message = "Invalid Password, please try again";
            }
            else {
                $location.url('/user/' + found._id);
            }

        }

    }
})();

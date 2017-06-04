(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        // event handlers
        model.register = register;

        // implementation
        function register(username, password, password2) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Please enter username';
                return;
            }

            if (password !== password2 || password === null || typeof password === 'undefined'){
                model.error = "Passwords must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(handleError, newUser)
                .then(userUrl);

            function handleError() {
                model.error = "sorry, that username is taken";
            }

            function newUser() {
                var user = {
                    username: username,
                    password: password
                };

                return userService
                    .createUser(user);
            }

            function userUrl() {
                $location.url('/user/' + user._id);
            }
        }
    }
})();

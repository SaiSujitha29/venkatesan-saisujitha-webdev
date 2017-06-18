(function () {
    angular
        .module('MovieApp')
        .controller('registerProjectController', registerProjectController);

    function registerProjectController($location, userService) {

        var model = this;

        // event handlers
        model.register = register;

        // implementation
        function register(username, password, password2) {
            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if(password === null || password === '' || typeof password === 'undefined') {
                model.error = 'password is required';
                return;
            }

            if(password2 === null || password2 === '' || typeof password2 === 'undefined') {
                model.error = 'verify password is required';
                return;
            }

            if(password !== password2) {
                model.error = "passwords must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(function (user) {
                    console.log(user);
                    if (user !== null) {
                        model.error = "sorry, that username is taken";
                    }
                },
                    function () {
                        var newUser = {
                            username: username,
                            password: password
                        };
                        return userService
                            .register(newUser);
                    }
                )
                .then(function (user) {
                    console.log(user);
                    $location.url('/profile');
                });
        }
    }
})();

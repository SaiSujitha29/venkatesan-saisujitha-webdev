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

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Username is required';
                return;
            }

            if( password === null || password === ''|| typeof password === 'undefined') {
                model.error = "Password is required";
                return;
            }

            userService
                //.findUserByCredentials(username, password)
                .login(username, password)
                .then(login, handleError);

            function handleError(error) {
                model.error = "Username " + username + " not found, please try again";
            }

            function login(found) {
                if(found !== null) {
                    $location.url('/profile');
                    // $scope.message = "Welcome " + username;
                } else {
                    model.error = "Username " + username + " not found, please try again";
                }
            }

        }

    }
})();

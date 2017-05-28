(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams, websiteService, $location) {

        var model = this;
        model.user_id = $routeParams['userId'];

        //event handlers
        model.createWebsite = createWebsite;

        function init() {
            model.websites = websiteService.findAllWebsitesByUser(model.user_id);
        }

        init();

        //implementation
        function createWebsite(website) {
            websiteService.createWebsite(model.user_id, website);
            $location.url('user/' + model.user_id + '/website');
        }

    }
})();

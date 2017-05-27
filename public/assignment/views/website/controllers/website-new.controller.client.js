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
            model.websites = websiteService.findAllWebsitesForUser(model.user_id);
        }

        init();

        //implementation
        function createWebsite(website) {
            website.developerId = model.user_id;
            websiteService.createWebsite(website);
            $location.url('user/' + model.user_id + '/website');
        }

    }
})();

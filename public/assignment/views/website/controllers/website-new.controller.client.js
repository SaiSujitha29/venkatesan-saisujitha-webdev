(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams, websiteService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];

        //event handlers
        model.createWebsite = createWebsite;

        // initializing the websites
        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }

        init();

        //implementation
        function createWebsite(id, website) {
            websiteService.createWebsite(id, website);
            $location.url('user/' + id + '/website');
        }

    }
})();

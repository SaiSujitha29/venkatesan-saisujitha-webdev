(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {

        var model = this;
        model.user_id = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;

        //event handlers
        model.createWebsite = createWebsite;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.user_id);
            model.website = websiteService.findWebsiteById(model.websiteId);
        }

        init();

        //implementation
        function createWebsite(website) {
            website.developerId = model.user_id;
            websiteService.createWebsite(website);
            $location.url('user/' + model.user_id + '/website');
        }

        function updateWebsite(websiteId, website) {
            websiteService.updateWebsite(websiteId, website);
            $location.url('user/' + model.user_id + '/website');
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('user/' + model.user_id + '/website');
        }

    }
})();

(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;

        //event handlers
        model.createWebsite = createWebsite;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        // initializing the websites
        function init() {
            websiteService
                .findWebsitesByUser(model.userId)
                .then(renderWebsites);

            function renderWebsites(websites) {
                model.websites = websites
            }

            websiteService
                .findWebsiteById(model.websiteId)
                .then(renderWebsite);

            function renderWebsite(website) {
                model.website = website;
            }
        }

        init();

        //implementation
        function createWebsite(website) {
            if (typeof website === 'undefined'){
                console.log("Inside");
                model.error = "Website Name required";
                return;
            }

            website.developerId = model.userId;
            websiteService
                .createWebsite(model.userId, website)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website');
                });
        }

        function updateWebsite(websiteId, website) {
            if (website.name === ""){
                console.log("Inside");
                model.error = "Website Name required";
                return;
            }
            websiteService
                .updateWebsite(websiteId, website)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website');
                });
        }

        function deleteWebsite(websiteId) {
            websiteService
                .deleteWebsite(websiteId)
                .then(function() {
                    $location.url('/user/'+model.userId+'/website');
                });
        }
    }
})();

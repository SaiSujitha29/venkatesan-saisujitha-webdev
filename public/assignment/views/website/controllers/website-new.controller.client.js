(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController(currentUser, $routeParams, websiteService, $location) {

        var model = this;
        model.userId = currentUser._id;
        //event handlers
        model.createWebsite = createWebsite;

        // initializing the websites
        function init() {
            websiteService
                .findWebsitesByUser(model.userId)
                .then(renderWebsites);

            function renderWebsites(websites) {
                model.websites = websites
            }
        }
        init();

        //implementation
        function createWebsite(id, website) {
            if (typeof website === 'undefined' || website === "" || website === null){
                model.error = "Website Name required";
                return;
            }
            website.developerId = id;
            websiteService
                .createWebsite(id, website)
                .then(function () {
                    //$location.url('/user/'+id+'/website');
                    $location.url('/website');
                });
        }

    }
})();

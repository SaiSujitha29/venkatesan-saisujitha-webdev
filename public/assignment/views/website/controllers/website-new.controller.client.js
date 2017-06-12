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
            // websiteService.createWebsite(id, website);
            // $location.url('user/' + id + '/website');
            if (typeof website === 'undefined'){
                console.log("Inside");
                model.error = "Website Name required";
                return;
            }
            website.developerId = id;
            websiteService
                .createWebsite(id, website)
                .then(function () {
                    $location.url('/user/'+id+'/website');
                });
        }

    }
})();

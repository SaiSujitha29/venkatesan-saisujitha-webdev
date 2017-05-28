(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, websiteService) {

        var model = this;
        model.user_id = $routeParams['userId'];

        // initializing the websites
        function init() {
            model.websites = websiteService.findWebsitesByUser(model.user_id);
        }
        init();

    }
})();

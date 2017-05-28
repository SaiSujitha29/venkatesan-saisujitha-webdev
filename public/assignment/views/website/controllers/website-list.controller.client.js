(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, websiteService) {

        var model = this;
        model.user_id = $routeParams['userId'];

        function init() {
            model.websites = websiteService.findAllWebsitesByUser(model.user_id);
        }
        init();

    }
})();

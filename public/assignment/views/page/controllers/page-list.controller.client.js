(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

    function pageListController($routeParams, pageService, $location) {

        var model = this;
        model.user_id = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        function init() {
            model.pages = pageService.findAllPagesForUser(model.websiteId);
        }

        init();



    }
})();

(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams, pageService, $location) {

        var model = this;
        model.user_id = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;

        function init() {
            model.pages = pageService.findAllPagesForUser(model.websiteId);
        }

        init();

    }
})();

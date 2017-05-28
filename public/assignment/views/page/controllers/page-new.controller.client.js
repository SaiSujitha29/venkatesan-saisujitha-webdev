(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams, pageService, $location) {

        var model = this;
        model.user_id = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        
        model.createPage = createPage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
        }

        init();
        
        function createPage(page) {
            pageService.createPage(model.websiteId, page);
            $location.url('/user/'+ model.user_id + '/website/' + model.websiteId + '/page');
        }

    }
})();

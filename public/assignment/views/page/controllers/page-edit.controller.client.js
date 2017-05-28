(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams, pageService, $location) {

        var model = this;
        model.user_id = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        //event handlers
        model.createPage = createPage;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
        }

        init();

        //implementation
        function createPage(page) {
            pageService.createPage(model.websiteId, page);
            $location.url('/user/' + model.user_id + '/website/' + model.websiteId + '/page');
        }

        function updatePage(pageId, page) {
            pageService.updatePage(pageId, page);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }

        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }

    }
})();

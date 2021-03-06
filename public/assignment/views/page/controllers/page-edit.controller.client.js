(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);

    function pageEditController(currentUser, $routeParams, pageService, $location) {

        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        //event handlers
        model.createPage = createPage;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages);

            function renderPages(pages) {
                model.pages = pages;
            }

            pageService
                .findPageById(model.pageId)
                .then(renderPage);

            function renderPage(page) {
                model.page = page;
            }
        }

        init();

        //implementation
        function createPage(page) {
            if (typeof page === 'undefined'){
                model.error = "Page Name required";
                return;
            }
            pageService
                .createPage(model.websiteId, page)
                .then(function () {
                    $location.url('/website/' + model.websiteId + '/page');
                });
        }

        function updatePage(pageId, page) {
            if (page.name === ""){
                model.error = "Page name required";
                return;
            }
            pageService
                .updatePage(pageId, page)
                .then(function () {
                    $location.url('/website/' + model.websiteId + '/page');
                });
        }

        function deletePage(pageId) {
            pageService
                .deletePage(pageId)
                .then(function () {
                    $location.url('/website/' + model.websiteId + '/page');
                });
        }
    }
})();

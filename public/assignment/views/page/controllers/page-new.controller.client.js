(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);

    function pageNewController(currentUser, $routeParams, pageService, $location) {

        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        
        model.createPage = createPage;

        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages);

            function renderPages(pages) {
                model.pages = pages;
            }
        }

        init();

        function createPage(websiteId, page) {
            if (typeof page === 'undefined'){
                model.error = "Page Name required";
                return;
            }
            pageService
                .createPage(websiteId, page)
                .then(function () {
                    $location.url('/website/' + websiteId + '/page');
                });
        }
    }
})();

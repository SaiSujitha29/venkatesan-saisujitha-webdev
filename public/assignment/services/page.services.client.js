(function () {
    angular
        .module('WebAppMaker')
        .factory('pageService', pageService);

    function pageService() {

        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];

        var api = {
            createPage: createPage,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage,
            findPageByWebsiteId: findPageByWebsiteId
        };

        return api;

         function createPage(websiteId, page) {
             page._id = (new Date()).getTime() + "";
             page.websiteId = websiteId;
             pages.push(page);
        }

        function updatePage(pageId, page) {
            for (var p in pages){
                if(pages[p]._id == pageId){
                    pages[p] = page;
                    break;
                }
            }
        }

        function deletePage(pageId) {
            var page = pages.find(function (page) {
                return page._id === pageId;
            });
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }

        function findPageById(pageId) {
            return pages.find(function (page) {
                return page._id === pageId;
            });
        }

        function findPageByWebsiteId(websiteId) {
            var resultSet = [];
            for( var p in pages){
                if (pages[p].websiteId === websiteId) {
                    resultSet.push(pages[p]);
                }
            }
            return resultSet;
        }
    }

})();
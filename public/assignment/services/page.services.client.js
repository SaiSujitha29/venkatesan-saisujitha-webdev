(function () {
    angular
        .module('WAM')
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
            findAllPagesForUser: findAllPagesForUser
        };

        return api;

         function createPage(websiteId, page) {
             page.websiteId = websiteId;
             pages.push(page);
        }

        function updatePage(pageId, page) {
            for (var w in pages){
                if(pages[w]._id == pageId){
                    pages[w] = page;
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

        function findAllPagesForUser(websiteId) {
            var resultSet = [];
            for( var w in pages){
                if (pages[w].websiteId === websiteId) {
                    resultSet.push(pages[w]);
                }
            }
            return resultSet;
        }
    }

})();
(function () {
    angular
        .module('WebAppMaker')
        .factory('websiteService', websiteService);

    function websiteService($http) {

        var api = {
            createWebsite: createWebsite,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
            findWebsitesByUser: findWebsitesByUser
        };

        return api;

         function createWebsite(userId, website) {
            var url = '/api/user/' + userId +'/website';
             return $http.post(url, website)
                 .then(function (response) {
                     return response.data;
                 });
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/" + websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWebsitesByUser(userId) {
            var url = '/api/user/'+ userId +'/website';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
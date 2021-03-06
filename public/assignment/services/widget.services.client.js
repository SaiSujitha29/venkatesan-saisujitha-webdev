(function () {
    angular
        .module('WebAppMaker')
        .factory('widgetService', widgetService);

    function widgetService($http, $routeParams) {

        var api = {
            createWidget: createWidget,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            findAllWidgetsByPageId: findAllWidgetsByPageId,
            sortWidgets: sortWidgets
        };

        return api;

         function createWidget(pageId, widget) {
             var url = '/api/page/'+pageId+'/widget';
             return $http.post(url,widget)
                 .then(function (response) {
                     return response.data;
                 });
        }

        function updateWidget(widgetId, widget) {
            var url = '/api/widget/' + widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function sortWidgets(initial, final) {
            var url = "/api/page/"+ $routeParams['pageId'] + "/widget?initial=" + initial + "&final=" + final;
            console.log(url);
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteWidget(widgetId) {
            var url = '/api/widget/' + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(widgetId) {
            var url = '/api/widget/' + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllWidgetsByPageId(pageId) {
            var url = '/api/page/' + pageId + '/widget';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
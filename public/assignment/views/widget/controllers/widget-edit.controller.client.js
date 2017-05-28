(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);
    
    function widgetEditController($sce, $routeParams, widgetService, $location) {

        var model = this;
        model.user_id = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        function init() {
            model.widgets = widgetService.findAllWidgetsByPageId(model.pageId);
            model.widget = widgetService.findWidgetById(model.widgetId);
        }

        init();

        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function deleteWidget(widgetId) {
            widgetService.deleteWidget(widgetId);
            $location.url('/user/' + model.user_id + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }
        
        function updateWidget(widgetId, widget) {
            widgetService.updateWidget(widgetId, widget);
            $location.url('/user/' + model.user_id + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }

    }
})();

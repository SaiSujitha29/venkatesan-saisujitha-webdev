(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);
    
    function widgetNewController($sce, $routeParams, widgetService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        function init() {
            widgetService
                .findAllWidgetsByPageId(model.pageId)
                .then(renderWidgets);

            function renderWidgets(widgets) {
                model.widgets = widgets;
            }
        }
        init();

        model.createWidget = createWidget;
        model.widgetType = widgetType;

        function widgetType(type) {
            model.type = type;
        }

        function createWidget(pageId, widget) {
            widget = {widget: widgetType = model.type};
            widgetService
                .createWidget(pageId, widget)
                .then(function (widget) {
                    console.log(widget);
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId
                        + '/widget/' + widget._id);
                });
        }
    }
})();

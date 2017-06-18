(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);
    
    function widgetNewController(currentUser, $sce, $routeParams, widgetService, $location) {

        var model = this;
        model.userId = currentUser._id;
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
            var widget = {};
            widget.widgetType = model.type;
            widgetService
                .createWidget(pageId, widget)
                .then(function (widget) {
                    $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
                });
        }
    }
})();

(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);
    
    function widgetEditController(currentUser, $sce, $routeParams, widgetService, $location) {

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

            widgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget);

            function renderWidget(widget) {
                model.widget = widget;
            }
        }

        init();

        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function deleteWidget(widgetId) {
            widgetService
                .deleteWidget(widgetId)
                .then(function () {
                    $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });
        }
        
        function updateWidget(widgetId, widget) {
            if (widget.name === "" ||typeof widget.name === 'undefined'|| widget.name === null){
                model.error = "Widget Name required";
                return;
            }
            widgetService
                .updateWidget(widgetId, widget)
                .then(function () {
                    $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });
        }

    }
})();

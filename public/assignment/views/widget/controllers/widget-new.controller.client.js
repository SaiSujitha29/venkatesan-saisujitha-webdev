(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);
    
    function widgetNewController($sce, $routeParams, widgetService, $location) {

        var model = this;
        model.user_id = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        function init() {
            model.widgets = widgetService.findAllWidgetsByPageId(model.pageId);
        }
        init();

        model.createWidget = createWidget;
        model.widgetType = widgetType;
        model.type;

        function widgetType(type) {
            model.type = type;
        }

        function createWidget(pageId, widget) {

            if (model.type === 1){
                widget = {"_id": "", "widgetType": "", "pageId": "", "text": ""};
                widget.widgetType = "HEADING";
            }
            if (model.type === 2){
                widget = { "_id": "", "widgetType": "", "pageId": "", "width": "", "url": ""};
                widget.widgetType = "IMAGE";
            }
            if (model.type === 3){
                widget = { "_id": "", "widgetType": "", "pageId": "", "width": "",
                    "url": "" };
                widget.widgetType = "YOUTUBE";
            }
            widgetService.createWidget(model.pageId, widget);
            $location.url('/user/' + model.user_id + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
            console.log(model.widgets);
        }
    }
})();

(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);
    
    function widgetListController($sce, $routeParams, widgetService) {

        var model = this;
        model.user_id = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        function init() {
            model.widgets = widgetService.findAllWidgetsByPageId(model.pageId);
        }

        init();

        model.trustThisContent = trustThisContent;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.getWidgetUrlForType = getWidgetUrlForType;

        // implementations
        function trustThisContent(html) {
            //diligence to scrub any unsafe content
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-'+ type.toLowerCase()+'.view.client.html';
        }

    }
})();

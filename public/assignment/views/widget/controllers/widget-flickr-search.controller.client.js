(function () {
    angular
        .module('WebAppMaker')
        .controller('FlickrImageSearchController', FlickrImageSearchController);
    
    function FlickrImageSearchController (currentUser, widgetService, FlickrService, $routeParams, $location) {

        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams.widgetId;

        function init() {
            widgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget);

            function renderWidget(widget) {
                model.widget = widget;
            }
        }
        init();

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            model.widget.url = url;

            widgetService
                .updateWidget(model.widgetId, model.widget)
                .then(function () {
                    $location.url('/website/' + model.websiteId + '/page/'+ model.pageId + '/widget/' + model.widgetId);
                });
        }

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

    }
})();

(function () {
    angular
        .module('WebAppMaker')
        .controller('FlickrImageSearchController', FlickrImageSearchController);
    
    function FlickrImageSearchController (widgetService, FlickrService, $routeParams, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams.widgetId;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            widget =  {'_id': model.widgetId, 'name': '', 'widgetType': 'IMAGE', 'pageId': model.pageId, 'width': '',
               'url': url, 'text': ''};

            widgetService
                .updateWidget(model.widgetId, widget)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/'
                        + model.pageId + '/widget/' + model.widgetId);
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

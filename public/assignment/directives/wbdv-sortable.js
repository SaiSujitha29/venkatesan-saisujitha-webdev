(function () {
    angular
        .module('wbdvDirectives',['ngRoute'])
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable(widgetService) {
        var initial = -1;
        var final = -1;
        function linkFunction(scope, element) {
            $(element).sortable({
                axis: 'y' ,
                start: function(event, ui) {
                    initial = ui.item.index();
                },
                stop: function(event, ui) {
                    final = ui.item.index();
                    widgetService
                        .sortWidget(initial, final);
                } });
        }
        return {
            link: linkFunction
        }
    };

})();

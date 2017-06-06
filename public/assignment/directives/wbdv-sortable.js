(function () {
    angular
        .module('wbdvDirectives',['ngRoute'])
        .directive('wbdvSortable', wbdvSortable);
    
    function wbdvSortable() {
        function linkFunction(scope, element) {
            $(element).sortable();
        }

        return {
            link: linkFunction
        }
    };

})();

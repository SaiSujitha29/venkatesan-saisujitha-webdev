/**
 * Created by SaiSujitha on 5/13/2017.
 */
(function () { //IIFE
    angular
        .module("TodoApp", [])
        .controller("TodoListController", TodoListController)

        function TodoListController($scope) {

            $scope.todo = {title: "initial title", details: "lorem ipsum"};
            $scope.addTodo = addTodo;
            $scope.removeTodo = removeTodo;
            $scope.selectTodo = selectTodo;
            $scope.updateTodo = updateTodo;
            $scope.todos = [];
            
            function updateTodo(todo) {
                $scope.todos[$scope.selectedIndex] = angular.copy(todo);
            }

            function selectTodo(index) {
                $scope.todo = angular.copy($scope.todos[index]);
                $scope.selectedIndex = index;
            }
            function removeTodo(todo) {//index) {
                console.log(todo);
                var index = $scope.todos.indexOf(todo)
                $scope.todos.splice(index, 1);
            }

            function addTodo(todo) {
                // var newTodo = {
                //     title: todo.title
                // };
                var newTodo = angular.copy(todo);
                newTodo._id = (new Date()).getTime();
                newTodo.date = new Date();
                //console.log(newTodo);
                $scope.todos.push(newTodo);
            }
        }
})();
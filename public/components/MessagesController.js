(function() {
    "use strict";

    angular.module("quotesApp")
        .controller("MessagesController", MessagesController);

    MessagesController.$inject = ["$scope", "MessagesService", "$interval"];

    function MessagesController($scope, MessagesService, $interval) {
        var controller = this;

        controller.getMessages = getMessages;
        //controller.addMessage = addMessage;

        $scope.filteredTodos = []
            ,$scope.currentPage = 1
            ,$scope.itemsPerPage = 2
            ,$scope.maxSize = 5;



        controller.getMessages();
        $interval(function() {
            //controller.getMessages();
        }, 500);

        controller.getMessages();

        function getMessages() {
            MessagesService.getMessages()
                .success(function(result) {
                    console.log('Count: ' + result.messages.length);
                    $scope.messages = result.messages;

                    //$scope.numPages = function () {
                    //    return Math.ceil($scope.messages.length / $scope.numPerPage);
                    //};
                    //
                    //
                    //$scope.$watch('currentPage + itemsPerPage', function() {
                    //    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                    //        , end = begin + $scope.numPerPage;
                    //
                    //    $scope.someMessages = $scope.messages.slice(begin, end);
                    //});

                    $scope.someMessages = [];
                    $scope.itemsPerPage = 2;
                    $scope.currentPage = 1;

                    //$scope.makeTodos = function() {
                    //    $scope.todos = [];
                    //    for (i=1;i<=1000;i++) {
                    //        $scope.todos.push({ text:'todo '+i, done:false});
                    //    }
                    //};

                    $scope.figureOutTodosToDisplay = function() {
                        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
                        var end = begin + $scope.itemsPerPage;
                        $scope.someMessages = result.messages.slice(begin, end);
                    };

                    //$scope.makeTodos();
                    $scope.figureOutTodosToDisplay();

                    $scope.pageChanged = function() {
                        $scope.figureOutTodosToDisplay();
                    };

                })
                .error(function(error) {
                    console.log('Error: ' + error);
                });
        }

        $scope.addMessage = function addMessage() {
            MessagesService.addMessage($scope.text);
            $scope.text = "";
        };

        //$scope.filteredTodos = []
        //    ,$scope.currentPage = 1
        //    ,$scope.numPerPage = 10
        //    ,$scope.maxSize = 5;
        //
        //$scope.makeTodos = function() {
        //    $scope.todos = [];
        //    for (var i=1;i<=1000;i++) {
        //        $scope.todos.push({ text:'todo '+i, done:false});
        //    }
        //};
        //$scope.makeTodos();
        //
        //$scope.numPages = function () {
        //    return Math.ceil($scope.todos.length / $scope.numPerPage);
        //};
        //
        //$scope.$watch('currentPage + numPerPage', function() {
        //    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
        //        , end = begin + $scope.numPerPage;
        //
        //    $scope.filteredTodos = $scope.todos.slice(begin, end);
        //});
    }
})();

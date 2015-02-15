(function() {
    "use strict";

    angular.module("quotesApp")
        .controller("MessagesController", MessagesController);

    MessagesController.$inject = ["$scope", "$interval", "MessagesService"];

    function MessagesController($scope, $interval, MessagesService) {
        var controller = this;

        controller.getMessages = getMessages;

        controller.getMessages();

        $interval(function() {
            //controller.getMessages();
        }, 500);

        function getMessages() {
            MessagesService.getMessages()
                .success(function(result) {
                    console.log('Count: ' + result.messages.length);
                    $scope.messages = result.messages;

                    $scope.someMessages = [];
                    $scope.itemsPerPage = 2;
                    $scope.currentPage = 1;

                    $scope.getMessagesToDisplay = function() {
                        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
                        var end = begin + $scope.itemsPerPage;
                        $scope.someMessages = result.messages.slice(begin, end);
                    };

                    $scope.getMessagesToDisplay();

                    $scope.pageChanged = function() {
                        $scope.getMessagesToDisplay();
                    };

                })
                .error(function(error) {
                    console.log('Error: ' + error);
                });
        }

        $scope.addMessage = addMessage;
        $scope.voteUpForMessage = voteUpForMessage;

        function voteUpForMessage(messageId) {
            console.log("controller vote up");
            MessagesService.voteUpForMessage(messageId);
        }

        function addMessage(newMessagetext) {
            MessagesService.addMessage(newMessagetext);
            $scope.newMessagetext = "";
        }
    }
})();

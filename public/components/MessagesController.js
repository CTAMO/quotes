(function() {
    "use strict";

    angular.module("quotesApp")
        .controller("MessagesController", MessagesController);

    MessagesController.$inject = ["$scope", "MessagesService", "$interval"];

    function MessagesController($scope, MessagesService, $interval) {
        var controller = this;

        controller.getMessages = getMessages;
        //controller.addMessage = addMessage;

        $interval(function() {
            controller.getMessages();
        }, 100);

        function getMessages() {
            MessagesService.getMessages()
                .success(function(result) {
                    console.log('Count: ' + result.messages.length);
                    $scope.messages = result.messages;
                })
                .error(function(error) {
                    console.log('Error: ' + error);
                });
        }

        $scope.addMessage = function addMessage() {
            MessagesService.addMessage($scope.text);
            $scope.text = "";
        };
    }
})();

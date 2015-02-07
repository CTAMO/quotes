(function() {
    "use strict";

    angular.module("quotesApp")
        .controller("MessagesController", MessagesController);

    MessagesController.$inject = ["$scope", "MessagesService"];

    function MessagesController($scope, MessagesService) {
        var controller = this;

        controller.getMessages = getMessages;
        //controller.addMessage = addMessage;

        controller.getMessages();

        function getMessages() {
            MessagesService.getMessages()
                .success(function(result) {
                    $scope.messages = result.messages;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }

        $scope.addMessage = function addMessage() {
            MessagesService.addMessage($scope.text);
        };
    }
})();

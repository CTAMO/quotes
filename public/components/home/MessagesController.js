(function() {
    "use strict";

    angular.module("quotesApp")
        .controller("MessagesController", MessagesController);

    MessagesController.$inject = ["$scope", "MessagesService"];

    function MessagesController($scope, MessagesService) {

        MessagesService.getMessages()
            .success(function(result) {
                $scope.messages = result.messages;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
})();

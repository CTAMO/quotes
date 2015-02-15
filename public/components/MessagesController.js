(function() {
    "use strict";

    angular.module("quotesApp")
        .controller("MessagesController", MessagesController);

    MessagesController.$inject = ["$scope", "$interval", "MessagesService", "UsersService"];

    function MessagesController($scope, $interval, MessagesService, UsersService) {
        var controller = this;
        controller.activate = activate;
        controller.getMessages = getMessages;
        controller.getUser = getUser;

        controller.activate();

        $interval(function() {
            //controller.getMessages();
        }, 500);

        $scope.addMessage = addMessage;
        $scope.voteUpForMessage = voteUpForMessage;
        $scope.logout = logout;

        function activate() {
            var controller = this;
            controller.getMessages();
            controller.getUser();
        }
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

        function voteUpForMessage(messageId) {
            console.log("controller vote up");
            MessagesService.voteUpForMessage(messageId);
        }

        function addMessage(newMessagetext) {
            MessagesService.addMessage(newMessagetext);
            $scope.newMessagetext = "";
        }

        function getUser() {
            UsersService.getUser()
                .success(function(result) {
                    $scope.user = result.user;
                })
                .error(function(error) {
                    console.log('Error getting user: ' + error);
                });
        }

        function logout() {
            UsersService.logout()
                .success(function(result) {
                    $scope.user = result.user;
                })
                .error(function(error) {
                    console.log('Error : ' + error);
                });
        }
    }
})();

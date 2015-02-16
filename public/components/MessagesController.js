(function() {
    "use strict";

    angular.module("quotesApp")
        .controller("MessagesController", MessagesController);

    MessagesController.$inject = ["$scope", "$interval", "MessagesService", "UsersService"];

    function MessagesController($scope, $interval, MessagesService, UsersService) {
        var controller = this;
        controller.activate = activate;
        controller.getMessages = getMessages;
        controller.getCurrentUser = getCurrentUser;

        controller.activate();

        $interval(function() {
            //controller.activate();
            //console.log("update");
        }, 300);

        $scope.addMessage = addMessage;
        $scope.voteUpForMessage = voteUpForMessage;
        $scope.voteDownForMessage = voteDownForMessage;
        $scope.logout = logout;
        $scope.muteUser = muteUser;
        $scope.unmuteUser = unmuteUser;

        function activate() {
            var controller = this;
            controller.getMessages();
            controller.getCurrentUser();
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

            MessagesService.getBestMessages()
                .success(function(result) {
                    $scope.bestMessages = result.bestMessages;
                })
                .error(function(error) {
                    console.log('Error: ' + error);
                });
        }

        function voteUpForMessage(messageId) {
            console.log("controller vote up");
            MessagesService.voteUpForMessage(messageId);
        }

        function voteDownForMessage(messageId) {
            console.log("controller vote up");
            MessagesService.voteDownForMessage(messageId);
        }

        function addMessage(newMessagetext) {
            MessagesService.addMessage(newMessagetext);
            $scope.newMessagetext = "";
        }

        function getCurrentUser() {
            UsersService.getCurrentUser()
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

        function muteUser(username) {
            UsersService.mute(username)
                .success(function(result) {
                    console.log("muted");
                })
                .error(function(error) {
                    console.log('Error : ' + error);
                });
        }

        function unmuteUser(username) {
            UsersService.unmute(username)
                .success(function(result) {
                    console.log("unmuted");
                })
                .error(function(error) {
                    console.log('Error : ' + error);
                });
        }
    }
})();

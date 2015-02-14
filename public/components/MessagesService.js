(function() {
    "use strict";

    angular.module("quotesApp")
        .factory("MessagesService", MessagesService);

    function MessagesService($http) {
        var service = {
            getMessages: getMessages,
            addMessage: addMessage,
            voteUpForMessage: voteUpForMessage

        };
        return service;

        function getMessages() {
            return $http.get("/api/messages");
        }

        function addMessage(text) {
            $http.post("/api/messages/add", {
                    messageText: text
                })
                .success(function(data, status, headers, config) {
                    console.log(data);
                })
                .error(function(data, status, headers, config) {
                    console.log("error when adding message: " + data);
                });
            console.log("addMessage called");
        }

        function voteUpForMessage(messageId) {


            $http.post("/api/messages/voteup", {
                    messageId: messageId
                })
                .success(function(data, status, headers, config) {
                    console.log(data);
                })
                .error(function(data, status, headers, config) {
                    console.log("error when voting up for message: " + data);
                });
            console.log("client message voted up " + messageId);
        }

    }
})();

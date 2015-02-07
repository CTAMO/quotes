
(function() {
    "use strict";

    angular.module("quotesApp")
        .factory("MessagesService", MessagesService);

    function  MessagesService($http) {
        return {
            getMessages: function() {
                return $http.get("/api/messages");
            }
        };
    }
})();

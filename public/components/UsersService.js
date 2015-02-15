/**
 * Created by Stamo on 2/15/2015.
 */
(function() {
    "use strict";

    angular.module("quotesApp")
        .factory("UsersService", UsersService);

    function UsersService($http) {
        var service = {
            getUser: getUser
        };
        return service;

        function getUser() {
            return $http.get("/api/user");
        }


    }
})();

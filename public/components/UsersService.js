/**
 * Created by Stamo on 2/15/2015.
 */
(function() {
    "use strict";

    angular.module("quotesApp")
        .factory("UsersService", UsersService);

    function UsersService($http) {
        var service = {
            getUser: getUser,
            logout: logout
        };
        return service;

        function getUser() {
            return $http.get("/api/user");
        }

        function logout() {
            return $http.get("/api/user/logout");
        }
    }
})();

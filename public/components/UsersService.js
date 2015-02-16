/**
 * Created by Stamo on 2/15/2015.
 */
(function() {
    "use strict";

    angular.module("quotesApp")
        .factory("UsersService", UsersService);

    function UsersService($http) {
        var service = {
            getCurrentUser: getCurrentUser,
            logout: logout,
            mute: mute
        };
        return service;

        function getCurrentUser() {
            return $http.get("/api/users");
        }

        function logout() {
            return $http.get("/api/users/logout");
        }

        function mute(username) {
            $http.post("/api/users/mute", {
                username: username
            });
        }
    }
})();

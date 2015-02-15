(function() {
    "use strict";

    angular.module("quotesApp")
        .controller("UsersController", UsersController);

    UsersController.$inject = ["$scope", "$interval", "UsersService"];

    function UsersController($scope, $interval, UsersService) {
        var controller = this;

        controller.getUser = getUser;

        controller.getUser();

        $interval(function() {
            //controller.getUser();
        }, 500);

        function getUser() {
            UsersService.getUser()
                .success(function(result) {
                    $scope.user = result.user;
                })
                .error(function(error) {
                    console.log('Error getting user: ' + error);
                });
        }

        $scope.logout = function logout() {
            UsersService.logout()
                .success(function(result) {
                    $scope.user = result.user;
                })
                .error(function(error) {
                    console.log('Error : ' + error);
                });
        };
    }
})();

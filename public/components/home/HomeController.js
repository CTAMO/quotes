(function() {
    "use strict";

    angular.module("quotesApp")
        .controller("HomeController", HomeController);

    HomeController.$inject = ["$scope", "MessagesService"];
    function HomeController($scope, MessagesService) {

        MessagesService.get()
            .success(function(result) {
                $scope.messages = result.data[0];
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
})();

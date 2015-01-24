(function() {
    "use strict";

    angular.module("quotesApp")
        .controller("HomeController", HomeController);

    function HomeController($scope) {
        $scope.text = "stamo";
    }
})();

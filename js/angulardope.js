angular.module('dopeslingerApp', [])
    .controller('dopeController', ['scope', function ($scope) {
        $scope.nsfwVal = false;

        $scope.nsfw = function () {
            if ($scope.nsfwVal) return "hidden";
            return "";
        }

        $scope.toggleNsfw = function () {
            $scope.nsfwVal = !$scope.nsfwVal;
        }

    }]);
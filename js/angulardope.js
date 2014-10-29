angular.module('dopeslingerApp', [])
    .controller('DopeController', ['$scope', function ($scope) {

        $scope.nsfw = true;
        $scope.toggleNsfw = function () {
            $scope.nsfw = !$scope.nsfw;
        }

    }]);
var app = angular.module("app", []);


app.controller("mainController",  function($scope, mainService) {
    $scope.getPeople = function() {
        mainService.get(window.location.origin + '/scenejs/babylonjs/practice/people.json').then(function(data) {
            addPeople(data.data);
        });
    }
});
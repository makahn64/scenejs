var app = angular.module("app", []);

app.factory("mainService", function($http) {
    var service = {};
    service.get = function(url) {
        return $http.get(url);
    };
    return service;
});

app.controller("mainController",  function($scope, mainService) {
    $scope.getPeople = function() {
        mainService.get(window.location.origin + '/scenejs/babylonjs/practice/people.json').then(function(data) {
            addPeople(data.data);
        });
    }
});
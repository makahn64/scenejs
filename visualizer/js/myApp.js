var myApp = angular.module("myApp", []);

myApp.factory("mainService", function ($http) {
    var service = {};
    service.get = function (url) {
        return $http.get(url);
    };
    return service;
});

myApp.controller("mainController", function ($scope, $http, $log) {


    $http.get(window.location.href + 'playlist.json')
        .then(function (data) {
                      runPlaylist(data.data);
                  })
        .catch(function (err){
            $log.error("Coouldn't hget json file");
        });

    $scope.runVisual = function (vizSrc, duration, callback, idx) {
        mainService.get('http://aso.appdelegates.net/photos/').then(function (data) {
            startScene(vizSrc, data.data, duration, callback, idx);
        });
    }

});

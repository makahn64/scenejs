var myApp = angular.module("myApp", []);

myApp.factory("mainService", function($http) {
	var service = {};
	service.get = function(url) {
		return $http.get(url);
	};
	return service;
});

myApp.controller("mainController", function($scope, mainService) {
    mainService.get(window.location.href + 'playlist.json').then(function(data) {
    	runPlaylist(data.data);
    });

	$scope.runVisual = function(vizSrc, duration, callback, idx) {
		mainService.get('http://aso.appdelegates.net/photos/').then(function(data) {
            startScene(vizSrc, data.data, duration, callback, idx);
        });
	}
});

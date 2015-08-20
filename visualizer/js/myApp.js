var myApp = angular.module("myApp", []);

myApp.factory("mainService", function($http) {
	var service = {};
	service.getPlaylist = function(playlistUrl) {
		return $http.get(playlistUrl);
	};
	return service;
});

myApp.controller("mainController", function($scope, mainService) {
    mainService.getPlaylist(window.location.href + 'playlist.json').then(function(data) {
    	runPlaylist(data.data);
    });
});

var myApp = angular.module("myApp", []);

myApp.factory("mainService", function($http) {
	var service = {};
	service.getPlaylist = function() {
		return $http.get(window.location.href + 'playlist.json');
	};
	return service;
})

myApp.controller("mainController", function($scope, mainService) {
    mainService.getPlaylist().then(function(data) {
    	runPlaylist(data.data);
    });
});

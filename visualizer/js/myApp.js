var myApp = angular.module("myApp", []);

myApp.controller("mainController", function($scope, $http, $log) {

    $http.get(window.location.href + 'playlist.json')
		.then(function(data) {
    		runPlaylist(data.data);
    	})

        .catch(function(err) {
            $log.error("Could not load playlist");
        });

	$scope.runVisual = function(vizSrc, duration, callback, idx) {
		$http.get('http://aso.appdelegates.net/photos/')
            .then(function(data) {
                startScene(vizSrc, data.data, duration, callback, idx);
            })

            .catch(function(err) {
                $log.error("Could not load images");
            });
	}
});

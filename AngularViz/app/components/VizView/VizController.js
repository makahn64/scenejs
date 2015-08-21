app.controller("vizViewController",
    function ( $scope, $log, playlistService, $timeout, $http, vizService ) {

        $log.debug("Loading vizViewController");

        //userDefaults.setStringForKey('hello', 'Ahoy matey!');
        //$log.debug("RC: "+userDefaults.getStringForKey('hello'));

        var item = playlistService.getCurrent();

        $scope.vizSrc = item.src;

        $http.get(item.imgSrc)

            .then(function(data) {
                vizService.startViz(item.src, data.data, parseInt(item.duration), playlistService.completed);
            })

            .catch(function(err) {
                $log.error("Could not get image data for visual at: " + item.src);
                playlistService.completed();
            });

    });


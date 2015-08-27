app.controller("videoViewController",
    function ( $scope, $log, playlistService ) {

        $log.debug("Loading videoViewController");

        //userDefaults.setStringForKey('hello', 'Ahoy matey!');
        //$log.debug("RC: "+userDefaults.getStringForKey('hello'));

        var item = playlistService.getCurrent();

        $scope.vidSrc = item.src;

        $scope.videoDone = function() {
            playlistService.completed();
        }
    }
);

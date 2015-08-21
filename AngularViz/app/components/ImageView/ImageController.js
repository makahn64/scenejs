/**
 *
 * Functionality that is shared across entire app should be in here or a service.
 *
 * New > 1.2 Version
 *
 */


app.controller("imageViewController",
    function ( $scope, $log, playlistService, $timeout ) {

        $log.debug("Loading imageViewController");

        //userDefaults.setStringForKey('hello', 'Ahoy matey!');
        //$log.debug("RC: "+userDefaults.getStringForKey('hello'));

        var item = playlistService.getCurrent();

        $scope.imgSrc = item.src;

        $timeout( playlistService.completed, parseInt(item.duration));



    });


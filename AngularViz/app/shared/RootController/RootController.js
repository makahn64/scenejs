/**
 *
 * Functionality that is shared across entire app should be in here or a service.
 *
 * New > 1.2 Version
 *
 */


app.controller("rootController", function ($scope, $log, playlistService, $location, $timeout) {

        $log.debug("Loading rootController");

        //userDefaults.setStringForKey('hello', 'Ahoy matey!');
        //$log.debug("RC: "+userDefaults.getStringForKey('hello'));


        $scope.$on("PLAYLIST_LOADED", function () {

            $log.info("Playlist loaded, whoohoo!");
            playlistService.sequence();

        })

        $scope.$on("BAD_PLAYLIST", function () {

            $log.error("Playlist is BAD, crap!");

        })


    });


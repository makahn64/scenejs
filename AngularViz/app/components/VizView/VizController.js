/**
 *
 * Functionality that is shared across entire app should be in here or a service.
 *
 * New > 1.2 Version
 *
 */


app.controller("vizViewController", [
    '$scope', '$log',
    function ( $scope, $log ) {

        $log.debug("Loading vizViewController");

        //userDefaults.setStringForKey('hello', 'Ahoy matey!');
        //$log.debug("RC: "+userDefaults.getStringForKey('hello'));

        $scope.imgSrc = "assets/img/clue.png";



    }]);


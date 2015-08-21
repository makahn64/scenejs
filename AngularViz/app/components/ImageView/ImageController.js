/**
 *
 * Functionality that is shared across entire app should be in here or a service.
 *
 * New > 1.2 Version
 *
 */


app.controller("imageViewController", [
    '$scope', '$log',
    function ( $scope, $log ) {

        $log.debug("Loading imageViewController");

        //userDefaults.setStringForKey('hello', 'Ahoy matey!');
        //$log.debug("RC: "+userDefaults.getStringForKey('hello'));

        $scope.imgSrc = "assets/img/elephant.jpg";



    }]);


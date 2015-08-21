app.controller("videoViewController", [
    '$scope', '$log',
    function ( $scope, $log ) {

        $log.debug("Loading videoViewController");

        //userDefaults.setStringForKey('hello', 'Ahoy matey!');
        //$log.debug("RC: "+userDefaults.getStringForKey('hello'));

        $scope.vidSrc = "assets/img/samplevideo.mp4";

    }
]);

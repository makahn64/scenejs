app.controller("mainController",  function($scope, $log, igService) {

    $scope.$on("IG_LOAD_FAIL", function() {
        $log.info("Instagrams failed to load");
    });

    $scope.$on("IGS_LOADED", function() {
        $log.info("Instagrams loaded");
        igService.displayNext();
    });

    $scope.$on("NO_IGS", function() {

    });

});
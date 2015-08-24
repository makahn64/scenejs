app.controller("mainController",  function($scope, $log, peopleService, factService) {

    $scope.$on("PEOPLE_LOADED", function() {
        $log.info("People loaded");
        peopleService.displayNext();
    });

    $scope.$on("FACTS_LOADED", function() {
        $log.info("Facts loaded");
    });

    $scope.$on("PERSON_PLACED", function() {
        $log.info("Person placed");
    });

    $scope.$on("NO_PEOPLE", function() {
        $log.info("No people to display right now");
        factService.displayNext();
    });


});
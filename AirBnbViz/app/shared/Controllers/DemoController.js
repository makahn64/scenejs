app.controller("demoController",  function($scope, $log, $timeout, peopleService, factService) {

    var _allPeople;
    var _startIdx;
    var _endIdx;

    $scope.$on("PEOPLE_LOADED", function() {
        $log.info("People loaded");
        _allPeople = peopleService.people;
        _startIdx = 0;
        _endIdx = 2;
    });

    $scope.$on("FACTS_LOADED", function() {
        $log.info("Facts loaded");
        factService.start();
        factService.displayNext();

        $timeout(function() {
            factService.stop();
        }, 15000);
    });

    $scope.$on("FACTS_STOPPED", function() {
        $log.info("Facts stopped");

        // restart viz--clear people
        if(_startIdx >= _allPeople.length) {
            _startIdx = 0;
            _endIdx = 2;
            peopleService.clearPeople();
        }

        peopleService._index = 0;
        peopleService.people = _allPeople.slice(_startIdx, _endIdx);

        _startIdx = _endIdx;
        _endIdx += 3;

        peopleService.displayNext();
    });

    $scope.$on("PERSON_PLACED", function() {
        $log.info("Person placed");
    });

    $scope.$on("NO_PEOPLE", function() {
        $log.info("No people to display right now");
        factService.start();
        factService.displayNext();

        $timeout(function() {
            factService.stop();
        }, 15000);
    });


});
app.factory("factService", function($rootScope, $log, $timeout, $http, $window) {

    var service = {};

    var _index = 0;
    var _holdTime = 5000;

    service.facts = [];

    service.getFacts = function(url) {
        $http.get(url)
            .then(function(data) {
                service.facts = data.data;
                _index = 0;
                $rootScope.$broadcast("FACTS_LOADED");
            })

            .catch(function(err) {
                $log.error("Could not load fact data");
            })
    };

    service.getLength = function() {
        return service.facts.length;
    };

    service.getIndex = function() {
        return _index;
    };

    service.getCurrent = function() {
        return service.facts[_index];
    };

    service.next = function() {
        _index++;

        if(_index == service.facts.length) {
            _index = 0;
            $log.info("Staring facts over");
        }

        return _index;
    };

    service.displayNext = function() {
        var nextFact = service.getCurrent();
        var width = 600;
        var height = 300;
        var posx = Math.random() * ($window.innerWidth - (width+150)) + 75;
        var posy = Math.random() * ($window.innerHeight - (height+150)) + 75;

        $timeout(function() {
            $rootScope.factStyle = {
                'top': posy + 'px', 'left': posx + 'px',
                'width': width + 'px', 'height': height + 'px',
                'background-color': '#00d1c1', 'color':'#ffffff'
            };
            $rootScope.curFact = nextFact;
            $rootScope.showFact = true;
        });

        $timeout(function() {
            service.completed();
        }, _holdTime);
    };

    service.completed = function() {
        service.next();

        $timeout(function() {
            $rootScope.showFact = false;
        });

        $timeout(function() {
            service.displayNext();
        }, 700);
    }

    return service;
});
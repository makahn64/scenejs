app.factory("factService", function($rootScope, $log, $timeout, $http, $window) {

    var service = {};

    var _index = 0;
    var _holdTime = 5000;
    var _colors = ["#00d1c1", "#ffb400", "#8ce071", "#7b0051"];
    var _colorIdx = 0;

    var _stop = false;

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

    service.getColor = function() {
        var color = _colors[_colorIdx];

        _colorIdx++;
        _colorIdx = _colorIdx % _colors.length;

        return color;
    };

    service.displayNext = function() {
        var nextFact = service.getCurrent();
        var width = 600;
        var height = 300;
        var posx = Math.random() * ($window.innerWidth - (width+150)) + 75;
        var posy = Math.random() * ($window.innerHeight - (height+150)) + 75;
        var bgColor = service.getColor();

        $timeout(function() {
            $rootScope.factStyle = {
                'top': posy + 'px', 'left': posx + 'px',
                'width': width + 'px', 'height': height + 'px',
                'background-color': bgColor, 'color':'#ffffff'
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

        if(!_stop) {
            $timeout(function () {
                service.displayNext();
            }, 700);
        }

        else {
            $timeout(function() {
                $rootScope.$broadcast("FACTS_STOPPED");
            }, 1000);
        }
    };

    service.stop = function() {
        _stop = true;
    };

    service.start = function() {
        _stop = false;
    };

    return service;
});
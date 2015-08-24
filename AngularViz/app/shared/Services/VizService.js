app.factory('vizService',
    function ($rootScope, $log, $timeout, $document) {
        "use strict";

        var service = {};

        var _loadedScripts = {};

        service.startViz =  function(vizSrc, imgData, duration, callback) {

            // Fixes issue with BabylonJS giving error "prepare is not a function".
            // Has something to do with another script modifying the Array.prototype.
            for(var i in Array.prototype) {
                Array.prototype[i].prepare = function(){};
            }

            if(!_loadedScripts[vizSrc]) {
                var script = $document[0].createElement("script");
                script.src = vizSrc;

                $document[0].head.appendChild(script);

                script.onload = function() {
                    _loadedScripts[vizSrc] = true;
                    runScene(imgData);

                    $timeout(function() {
                        clearScene();
                        callback();
                    }, duration);
                };
            }


            else {
                runScene(imgData);

                $timeout(function() {
                    clearScene();
                    callback();
                }, duration);
            }
        };

        return service;

    });

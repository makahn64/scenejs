app.factory('vizService',
    function ($rootScope, $log, $timeout, $document, $q) {
        "use strict";

        var service = {};

        var _loadedScripts = {};

        service.startViz =  function(vizSrc, imgData, duration, callback) {

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

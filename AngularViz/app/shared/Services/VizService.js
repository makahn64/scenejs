app.factory('vizService',
    function ($rootScope, $log, $timeout, $document, userDefaults) {
        "use strict";

        var service = {};

        var _loadedScripts = {};

        service.startViz = function (vizSrc, imgData) {

            if (!_loadedScripts[vizSrc]) {

                $log.info("Loading  " + vizSrc);
                var script = $document[0].createElement("script");
                script.src = vizSrc;

                $document[0].head.appendChild(script);

                script.onload = function () {
                    _loadedScripts[vizSrc] = true;
                    runScene(imgData, $rootScope, userDefaults);
                }
            }

            else {

                $log.info("Script " + vizSrc + " already loaded, running scene");
                runScene(imgData, $rootScope, userDefaults);
            }
        };

        return service;

    });

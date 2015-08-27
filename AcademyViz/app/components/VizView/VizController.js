app.controller("vizViewController",
    function ( $scope, $log, playlistService, $filter, $http, vizService ) {

        $log.debug("Loading vizViewController");

        //userDefaults.setStringForKey('hello', 'Ahoy matey!');
        //$log.debug("RC: "+userDefaults.getStringForKey('hello'));

        $scope.$on('VIZ_DONE', function() {
            playlistService.completed();
        });

        var item = playlistService.getCurrent();

        $scope.vizSrc = item.src;

        $http.get(item.imgSrc)

            .then(function(data) {

                var imgData = [];
                for (var p = 0; p < data.data.photos.length; p++) {
                    if (data.data.photos[p].url.indexOf('ticket') != -1) {
                       imgData.push(data.data.photos[p]);
                    }
                }

                imgData = $filter('orderBy')(imgData, "-createdAt");
                imgData.slice(0, parseInt(item.imgNum));

                vizService.startViz(item.src, imgData);
            })

            .catch(function(err) {
                $log.error("Could not get image data for visual at: " + item.src);
                playlistService.completed();
            });

    });


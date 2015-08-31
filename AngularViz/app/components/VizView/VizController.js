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

                var photos = data.data.photos;

                photos.forEach( function(photo){

                    var isTicket = ( photo.url.indexOf('ticket') !== -1 );
                    var isFlagged= photo.flagged;

                    if (isTicket && !isFlagged ){
                        imgData.push(photo);
                    }

                });

                //Hack to get atleast 2 in the pipe
                if (imgData.length==1){
                    imgData.push(imgData[0]);
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


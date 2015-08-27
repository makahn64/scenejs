app.controller("vizViewController",
    function ( $scope, $log, playlistService, $filter, $http, vizService ) {

        $log.debug("Loading vizViewController");

        //userDefaults.setStringForKey('hello', 'Ahoy matey!');
        //$log.debug("RC: "+userDefaults.getStringForKey('hello'));

        $scope.$on('VIZ_DONE', function() {
            playlistService.completed();
        });

        var item = playlistService.getCurrent();

        var imgData = [{url: 'assets/img/ticket1.jpg'},
            {url: 'assets/img/ticket2.jpg'},
            {url: 'assets/img/ticket3.jpg'},
            {url: 'assets/img/ticket4.jpg'},
            {url: 'assets/img/ticket5.jpg'}];

        vizService.startViz(item.src, imgData);

    });


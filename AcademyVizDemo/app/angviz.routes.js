app.config(function ($routeProvider) {
    $routeProvider


        .when('/image/:seqNum', {
            templateUrl: 'app/components/ImageView/imageview.partial.html',
            controller: 'imageViewController'
        })

        .when('/video/:seqNum', {
            templateUrl: 'app/components/VideoView/videoview.partial.html',
            controller: 'videoViewController'
        })

        .when('/viz/:seqNum', {
            templateUrl: 'app/components/VizView/vizview.partial.html',
            controller: 'vizViewController'
        })

        .otherwise('/')
});






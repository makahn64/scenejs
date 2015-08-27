app.config(function ($routeProvider) {
    $routeProvider


        .when('/image', {
            templateUrl: 'app/components/ImageView/imageview.partial.html',
            controller: 'imageViewController'
        })

        .when('/video', {
            templateUrl: 'app/components/VideoView/videoview.partial.html',
            controller: 'videoViewController'
        })

        .when('/viz', {
            templateUrl: 'app/components/VizView/vizview.partial.html',
            controller: 'vizViewController'
        })

        .otherwise('/')
});






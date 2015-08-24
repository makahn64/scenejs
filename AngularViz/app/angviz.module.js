
/*********************************

 File:       angviz.module
 Function:   Base App
 Copyright:  AppDelegates LLC
 Date:       3/10/15
 Author:     atorres

 **********************************/

var app = angular.module('angVizApp', [
    'ngRoute', 'ngSanitize',
    'ngAnimate', 'ui.event'])



app.config(function () {

    console.info("app.CONFIGing");

});


app.run(['$rootScope', '$location', '$log', 'playlistService',
    function ($rootScope, $location,  $log, playlistService) {

        $log.info("app.RUNning");

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            $log.info('$routeChangeStart');

        });

        playlistService.init();

    }
]);
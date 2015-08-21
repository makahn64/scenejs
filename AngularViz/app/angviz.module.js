
/*********************************

 File:       angviz.module
 Function:   Base App
 Copyright:  AppDelegates LLC
 Date:       3/10/15
 Author:     atorres

 **********************************/


var app = angular.module('angVizApp', [
    'ngRoute', 'ngAnimate',
    'ngSanitize'])



app.config(function () {

    console.info("app.CONFIGing");

});


app.run(['$rootScope', '$location', '$log',
        function ($rootScope, $location,  $log) {

        $log.info("app.RUNning");

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            $log.info('$routeChangeStart');

        });


    }]);


//Patch that monkey
Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};
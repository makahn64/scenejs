var app = angular.module("igViz", ['ngAnimate', 'ngActiv8']);

app.run(function(igService) {
    igService.get();
});
var myApp = angular.module("ngActiv8");

myApp.controller("myControl", function($scope, actv8API) {
    actv8API.authorize("admin", "p@ssw0rd").then(function() {
        actv8API.getInstagramMedia().then(function(data) {
            runScene(data.data, actv8API.getSiteOrigin());
        });
    });
});

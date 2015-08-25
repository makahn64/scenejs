var app = angular.module("airViz", ['ngAnimate']);

app.config(function() {
    console.info("app config-ing");
});

app.run(function(peopleService, factService) {
    factService.getFacts("assets/facts.json");
    peopleService.getPeople("assets/people1.json");
});

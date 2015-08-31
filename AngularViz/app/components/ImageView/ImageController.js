app.controller("imageViewController",
               function ($scope, $log, playlistService, $timeout, userDefaults) {

                   $log.debug("Loading imageViewController");

                   //userDefaults.setStringForKey('hello', 'Ahoy matey!');
                   //$log.debug("RC: "+userDefaults.getStringForKey('hello'));

                   var item = playlistService.getCurrent();

                   if (item.sponsor) {

                       var sImg = userDefaults.getStringForKey("sponsorImage", "");
                       if (!sImg) {
                           $scope.imgSrc = "assets/img/missing.jpg";
                       } else {
                           $scope.imgSrc = item.src + '/' + sImg;
                       }

                       $log.info("Sponsor image, coming right up! " + sImg);

                   } else {
                       $scope.imgSrc = item.src;

                   }


                   $timeout(playlistService.completed, parseInt(item.duration));

               });


app.factory("igService", function($rootScope, $filter, $log, $timeout, $window, $http, actv8API) {
    var service = {};

    service._index = 0;
    var _holdTime = 3000;

    service.igs = [];
    service.igPlanes = [];

    service.get = function() {
        actv8API.authorize("admin", "p@ssw0rd").then(function() {

            actv8API.getInstagramMedia()

                .then(function(data) {
                    service._index = 0;

                    for (var i = 0; i < data.data.length; i++) {
                        if (data.data[i].data.instagram.location != null) {
                            service.igs.push(data.data[i]);
                        }
                    }

                    $rootScope.$broadcast("IGS_LOADED");
                })

                .catch(function() {
                    $rootScope.$broadcast("IG_LOAD_FAIL");
                })
        });
    };

    service.getLength = function() {
        return service.igs.length;
    };

    service.getIndex = function() {
        return service._index;
    };

    service.getCurrent = function() {
        return service.igs[service._index];
    };

    service.next = function() {
        service._index++;

        if(service._index == service.igs.length) {
            service.igs = [];
            $rootScope.$broadcast('NO_IGS');
        }

        return service._index;
    };

    service.displayNext = function() {
        var nextIg = service.getCurrent();

        service.addIg(nextIg);
        service.addText(nextIg);

        $timeout(function() {
            service.startPlacement(nextIg.data.instagram.location.latitude, nextIg.data.instagram.location.longitude,
                EARTH_RADIUS/2, $window.scene, service.finishPlacement);
        }, _holdTime);
    };

    service.addIg = function(ig) {
        var imgPlane = BABYLON.Mesh.CreatePlane("imgPlane", 1, scene);
        imgPlane.position = new BABYLON.Vector3(-4.5, 0, -4);

        var imgMat = new BABYLON.StandardMaterial("imgMat", scene);
        imgMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
        imgMat.diffuseTexture = new BABYLON.Texture(actv8API.getSiteOrigin() + ig.url, scene);
        imgPlane.material = imgMat;

        service.igPlanes.push(imgPlane);
    };

    service.addText = function(ig) {
        $timeout(function() {
            $rootScope.curName = ig.data.instagram.user['full_name'];
            $rootScope.curUsername = ig.data.instagram.user.username;
            $rootScope.showCard = true;
        });
    };

    service.startPlacement = function(lat, long, radius, scene, callback) {
        var earth = scene.getMeshByName("earth");

        $timeout(function() {
            $rootScope.showCard = false;
        });

        $timeout(function() {
            rotateEarth(false);

            var relLat = Math.PI / 2 - lat * Math.PI / 180;
            var relLong = long * Math.PI / 180 - Math.PI / 2;
            var imgY = radius * Math.cos(relLat);
            var imgZ = -radius * Math.sin(relLat);
            var imgTilt = Math.PI / 2 - relLat;

            var animations = [];

            animations.push(spinEarthY(relLong, scene));
            animations.push(moveCameraTargetX(0, scene));
            animations.push(moveCameraBeta(relLat, scene));
            animations.push(moveImg(new BABYLON.Vector3(0, imgY, imgZ - 0.01), scene));
            animations.push(scaleImg(new BABYLON.Vector3(0.15, 0.15, 0), scene));
            animations.push(rotateImgX(imgTilt, scene));
            animations.push(zoomIn(scene));

            waitForAnimations(animations, callback);
        }, 1200);
    };

    service.finishPlacement = function() {
        var scene = $window.scene;
        var imgPlane = scene.getMeshByName("imgPlane");
        var earth = scene.getMeshByName("earth");

        earth.computeWorldMatrix();
        var earthMatrixInv = earth.getWorldMatrix().clone().invert();

        imgPlane.computeWorldMatrix();
        var imgMatrix = imgPlane.getWorldMatrix();

        var newImgMatrix = imgMatrix.multiply(earthMatrixInv);
        var newImgTRS = decomposeTRSMatrix(newImgMatrix);
        var earthTRS = decomposeTRSMatrix(earthMatrixInv);

        var xRot = imgPlane.rotation.x;

        imgPlane.rotation = earthTRS.rotation;
        imgPlane.rotation.x = xRot;
        imgPlane.position = newImgTRS.translation;
        imgPlane.scaling = newImgTRS.scaling;

        imgPlane.parent = earth;

        imgPlane.id = '';
        imgPlane.name = '';

        var animations = [];
        animations.push(moveCameraTargetX(-3, scene));
        animations.push(moveCameraBeta(Math.PI / 2, scene));
        animations.push(zoomOut(scene));

        waitForAnimations(animations, service.igPlaced);
        rotateEarth(true);
    };

    service.igPlaced = function() {

        if(service.next() < service.igs.length) {
            service.displayNext();
        }

        $rootScope.$broadcast("IG_PLACED");
    };

    service.clearIgs = function() {

        for(var i = 0; i < service.igPlanes.length; i++) {
            service.igPlanes[i].dispose();
        }

        service.igPlanes = [];
    };


    return service;
});

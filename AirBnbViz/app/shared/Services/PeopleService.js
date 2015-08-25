app.factory("peopleService", function($rootScope, $log, $timeout, $window, $http) {
    var service = {};

    var _index = 0;
    var _holdTime = 3000;

    service.people = [];

    service.getPeople = function(url) {
        $http.get(url)
            .then(function (data) {
                service.people = data.data;
                _index = 0;
                $rootScope.$broadcast("PEOPLE_LOADED");
            })

            .catch(function (err) {
                $log.error("Could not load people data");
                $rootScope.$broadcast("NO_PEOPLE");
            })
    };

    service.getLength = function() {
        return service.people.length;
    };

    service.getIndex = function() {
        return _index;
    };

    service.getCurrent = function() {
        return service.people[_index];
    };

    service.next = function() {
        _index++;

        if(_index == service.people.length) {
            service.people = [];
            $rootScope.$broadcast('NO_PEOPLE');
        }

        return _index;
    };

    service.displayNext = function() {
        var nextPerson = service.getCurrent();

        service.addPerson(nextPerson);
        service.addText(nextPerson);

        $timeout(function() {
            service.startPlacement(nextPerson.lat, nextPerson.long, EARTH_RADIUS/2, $window.scene, service.finishPlacement);
        }, _holdTime);
    };

    service.addPerson = function(person) {
        var imgPlane = BABYLON.Mesh.CreateDisc("imgPlane", 0.65, 50, scene);
        imgPlane.scaling.y = -1;
        imgPlane.position = new BABYLON.Vector3(-4.2, 0, -4);

        var imgMat = new BABYLON.StandardMaterial("imgMat", scene);
        imgMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
        imgMat.backFaceCulling = false;
        imgMat.diffuseTexture = new BABYLON.Texture("assets/img/" + person.imgUrl, scene);
        imgPlane.material = imgMat;
    };

    service.addText = function(person) {
        $timeout(function() {
            $rootScope.curPerson = person;
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
            animations.push(scaleImg(new BABYLON.Vector3(0.15, -0.15, 0), scene)); // y scale must be neg. for disc
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
        imgPlane.scaling.y *= -1;   // y scale must be neg. for disc

        imgPlane.parent = earth;

        imgPlane.id = '';
        imgPlane.name = '';

        var animations = [];
        animations.push(moveCameraTargetX(-3, scene));
        animations.push(moveCameraBeta(Math.PI / 2, scene));
        animations.push(zoomOut(scene));

        waitForAnimations(animations, service.personPlaced);
        rotateEarth(true);
    };

    service.personPlaced = function() {

        if(service.next() < service.people.length) {
            service.displayNext();
        }

        $rootScope.$broadcast("PERSON_PLACED");
    };


    return service;
});

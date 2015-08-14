function runScene(igData) {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    console.log(igData);

    var createScene = function () {
        // Set scene and background color
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(0, 0, 0);

        // Create camera
        var mainCamera = new BABYLON.ArcRotateCamera("mainCamera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
        mainCamera.setPosition(new BABYLON.Vector3(0, 0, -20));
        scene.activeCamera = mainCamera;
        scene.activeCamera.attachControl(canvas);

        // Create light
        var light = new BABYLON.PointLight("light", new BABYLON.Vector3(-5, 10, -20), scene);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
        light.intensity = 0.75;

        return scene;
    };

    var scene = createScene();

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });

    function getRandCoord() {
        return new BABYLON.Vector3(-10 + 20 * Math.random(), -15 + 30 * Math.random(), -10 + 20 * Math.random());
    }

    function getInstagram(idx, scene) {
        var coord = getRandCoord();
        var name = "ig" + i;
        var imgUrl = igData[i].url;
        var ig = BABYLON.Mesh.CreatePlane(name, 4, scene);

        ig.position = coord;
        ig.scaling.y = 1.5;
        ig.myYDirection = 0.5 - Math.random();

        var igMat = new BABYLON.StandardMaterial(name + "Mat", scene);
        igMat.backFaceCulling = false;
        igMat.diffuseTexture = new BABYLON.Texture("http://localhost:1337" + imgUrl, scene);

        ig.material = igMat;

        return ig;
    }

    function move(ig) {
        var yInc = 0.02;
        var y = ig.position.y + yInc * ig.myYDirection;

        if (y > 20 || y < -20) {
            ig.myYDirection *= -1;
        }

        ig.position.y = y;
    }

    var igs = [];
    // limits number of instagrams in the scene to 25
    for(var i = 0; i < igData.length && i < 25; i++) {
        var newIg = getInstagram(i, scene);
        igs.push(newIg);
    }

    scene.beforeRender = function() {
        for(var i = 0; i < igs.length; i++) {
            move(igs[i]);
        }
     };
}
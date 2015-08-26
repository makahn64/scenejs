var EARTH_RADIUS = 5;

var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    // Set scene and background color
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(1, 1, 1);
    scene.ambientColor = new BABYLON.Color3(1, 1, 1);

    // Create camera
    var mainCamera = new BABYLON.ArcRotateCamera("mainCamera", 0, 0, 0, new BABYLON.Vector3(-3, 0, 0), scene);
    mainCamera.setPosition(new BABYLON.Vector3(-3, 0, -7));
    scene.activeCamera = mainCamera;

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(-2, 0, 1), scene);

    // Create earth
    var earth = BABYLON.Mesh.CreateSphere("earth", 25, EARTH_RADIUS, scene);
    earth.position = new BABYLON.Vector3(0, 0, 0);
    earth.rotation.x = 0;
    earth.rotation.y = Math.PI;

    // Define the material for the earth model
    var earthBase = new BABYLON.StandardMaterial("earthBase", scene);
    earthBase.emissiveTexture = new BABYLON.Texture("assets/img/earthEmit.gif", scene);
    earthBase.ambientTexture = new BABYLON.Texture("assets/img/earthDiffuse.jpg", scene);
    earthBase.specularPower = 32;
    earthBase.specularTexture = new BABYLON.Texture("assets/img/earthSpecular.png", scene);
    earthBase.bumpTexture = new BABYLON.Texture("assets/img/earthNormal.jpg", scene);


    earth.material = earthBase;

    return scene;
};

var scene = createScene();

// Make earth rotate
var rotate = true;
var earth = scene.getMeshByName("earth");

scene.beforeRender = function () {
    if (rotate) {
        if(earth.rotation.y > -2 * Math.PI) {
            earth.rotation.y -= 0.0025;
        }
        else {
            earth.rotation.y = 0;
        }
    }
};

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});

function rotateEarth(bool) {
    rotate = bool;
}
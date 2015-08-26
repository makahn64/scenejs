var EARTH_RADIUS = 5;

var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    // Set scene and background color
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(1, 1, 1);

    // Create camera
    var mainCamera = new BABYLON.ArcRotateCamera("mainCamera", 0, 0, 0, new BABYLON.Vector3(-3, 0, 0), scene);
    mainCamera.setPosition(new BABYLON.Vector3(-3, 0, -7));
    scene.activeCamera = mainCamera;
    //scene.activeCamera.attachControl(canvas);

    // Create earth
    var earth = BABYLON.Mesh.CreateSphere("earth", 25, EARTH_RADIUS, scene);
    earth.position = new BABYLON.Vector3(0, 0, 0);
    earth.rotation.x = 0;
    earth.rotation.y = Math.PI;

    // Define the material for the earth model
    var earthMat = new BABYLON.StandardMaterial("earthMat", scene);
    earthMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
    earthMat.diffuseTexture = new BABYLON.Texture("assets/img/airBnbEarth.jpg", scene);

    earthMat.emissiveFresnelParameters = new BABYLON.FresnelParameters();
    earthMat.emissiveFresnelParameters.leftColor = new BABYLON.Color3(0, 0, 0);
    earthMat.emissiveFresnelParameters.rightColor = BABYLON.Color3.White();
    earthMat.emissiveFresnelParameters.bias = 0.8;
    earthMat.emissiveFresnelParameters.power = 0.4;

    earth.material = earthMat;

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
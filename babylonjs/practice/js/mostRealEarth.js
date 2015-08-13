var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    // Set scene and background color
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(1, 1, 1);

    // Create camera
    var mainCamera = new BABYLON.ArcRotateCamera("mainCamera", -2, 1.3, 200, new BABYLON.Vector3.Zero(), scene);
    scene.activeCamera = mainCamera;
    scene.activeCamera.attachControl(canvas);

    var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-2, 1, 0), scene);
    light.intensity = 0.85;

    // Create earth
    var earth = BABYLON.Mesh.CreateSphere("earth", 100, 100, scene);
    earth.position = new BABYLON.Vector3(0, 0, 0);
    earth.rotation.y = Math.PI;

    // Define the material for the earth model
    var earthBase = new BABYLON.StandardMaterial("earthBase", scene);
    //earthBase.emissiveColor = new BABYLON.Color3(0.75, 0.75, 0.75);
    earthBase.emissiveTexture = new BABYLON.Texture("textures/earthEmit.gif", scene);
    earthBase.diffuseTexture = new BABYLON.Texture("textures/earth.jpg", scene);
    earthBase.specularPower = 32;
    earthBase.specularTexture = new BABYLON.Texture("textures/earthSpecular.png", scene);
    earthBase.bumpTexture = new BABYLON.Texture("textures/earthNormal.jpg", scene);

    earth.material = earthBase;

    return scene;
};

var scene = createScene();

// Make earth rotate
var rotate = true;
var earth = scene.getMeshByName("earth");

scene.beforeRender = function () {
    if (rotate) {
        //earth.rotate(BABYLON.Axis.Y, -0.005, BABYLON.Space.LOCAL);
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
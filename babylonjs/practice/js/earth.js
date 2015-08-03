var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
    // Set scene and background color
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(1, 1, 1);

    // Create camera
    var mainCamera = new BABYLON.ArcRotateCamera("mainCamera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
    mainCamera.setPosition(new BABYLON.Vector3(0, 3, 10));
    scene.activeCamera = mainCamera;
    scene.activeCamera.attachControl(canvas);

    // Add a light
    var light = new BABYLON.HemisphericLight("Light", new BABYLON.Vector3(5, 0, 10), scene);
    light.diffuse = new BABYLON.Color3(1, 1, 1);

    // Create shape
    var earth = BABYLON.Mesh.CreateSphere("Earth", 25, 5, scene);
    earth.position = new BABYLON.Vector3(-3, 1, 0);
    earth.rotation.x = Math.PI;
    earth.rotation.y = 0;

    // Define the material for the earth model
    var earthMat = new BABYLON.StandardMaterial("earthMat", scene);
    earthMat.diffuseColor = new BABYLON.Color3(0, 0.7, 1);
    earthMat.diffuseTexture = new BABYLON.Texture("textures/earthBW.gif", scene);
    earthMat.diffuseTexture.hasAlpha = true;
    earth.material = earthMat;


    return scene;
}

var scene = createScene();

// Make earth rotate
var alpha = 0;
var rotate = true;
var earth = scene.getMeshByName("Earth");
scene.beforeRender = function() {
    if(rotate) {
        earth.rotation.y = alpha;
        alpha -= 0.001;  // issues with constantly decrementing?
    }
};

moveEarth(new BABYLON.Vector3(0, 0, 0));


engine.runRenderLoop(function() {
    scene.render();
});

window.addEventListener("resize", function() {
    engine.resize();
});
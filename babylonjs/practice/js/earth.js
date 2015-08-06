var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    // Set scene and background color
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(1, 1, 1);

    // Create camera
    var mainCamera = new BABYLON.ArcRotateCamera("mainCamera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
    mainCamera.setPosition(new BABYLON.Vector3(0, 3, 10));
    scene.activeCamera = mainCamera;
    scene.activeCamera.attachControl(canvas);

    // Add a light
    var light = new BABYLON.HemisphericLight("Light", new BABYLON.Vector3(0, -100, 200), scene);
    light.diffuse = new BABYLON.Color3(1, 1, 1);

    // Create shape
    var earth = BABYLON.Mesh.CreateSphere("Earth", 250, 5, scene);
    earth.position = new BABYLON.Vector3(-3, 1, 0);
    earth.rotation.x = Math.PI;
    earth.rotation.y = Math.PI;

    // Define the material for the earth model
    var earthMat = new BABYLON.StandardMaterial("earthMat", scene);
    earthMat.diffuseColor = new BABYLON.Color3(0, 0.7, 1);
    earthMat.emissiveColor = new BABYLON.Color3(0, 0.7, 1);
    earthMat.specularColor = new BABYLON.Color3(0.7,0.7,0.7);
    earthMat.specularPower = 32;
    earthMat.diffuseTexture = new BABYLON.Texture("textures/earthBW.gif", scene);
    earthMat.diffuseTexture.hasAlpha = true;
    earth.material = earthMat;


    var tiledGround = BABYLON.Mesh.CreateGround("ground", 6, 6, 2, scene);
    tiledGround.position = new BABYLON.Vector3(0, -3.0, 0);

    var groundMat = new BABYLON.StandardMaterial("shiny", scene);
    groundMat.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    groundMat.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    groundMat.specularPower = 32;
    tiledGround.material = groundMat;

    var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(0, -2.9, 6), scene);
    light0.diffuse = new BABYLON.Color3(1, 0, 0);
    light0.specular = new BABYLON.Color3(1, 1, 1);

    return scene;
}

var scene = createScene();

// Make earth rotate
var alpha = 0;
var rotate = true;
var earth = scene.getMeshByName("Earth");
scene.beforeRender = function () {
    if (rotate) {
        earth.rotation.y = alpha;
        alpha -= 0.001;  // issues with constantly decrementing?
    }
};

moveEarth(new BABYLON.Vector3(0, 0, 0));


engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
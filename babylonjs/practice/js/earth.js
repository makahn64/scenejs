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
    var earth = BABYLON.Mesh.CreateSphere("earth", 25, 5, scene);
    earth.position = new BABYLON.Vector3(0, 0, 0);
    earth.rotation.x = 0;
    earth.rotation.y = Math.PI;

    // Define the material for the earth model
    var earthMat = new BABYLON.StandardMaterial("earthMat", scene);
    earthMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
    earthMat.diffuseTexture = new BABYLON.Texture("textures/earthTop1.jpeg", scene);
    //earthMat.emissiveColor = new BABYLON.Color3(0, 0.7, 1);
    //earthMat.diffuseTexture = new BABYLON.Texture("textures/earthBW.gif", scene);
    //earthMat.diffuseTexture.hasAlpha = true;
    earth.material = earthMat;

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

function addPerson() {
    // Get input
    var name = document.getElementById("name").value;
    var location = document.getElementById("location").value;
    var imgNum = document.getElementById("imgNum").value;
    var lat = parseFloat(document.getElementById("lat").value);
    var long = parseFloat(document.getElementById("long").value);

    // Create image plane
    var imgPlane = BABYLON.Mesh.CreateDisc("imgPlane", 0.65, 50, scene);
    imgPlane.scaling.y = -1;
    imgPlane.position = new BABYLON.Vector3(-4.6, 0.2, -4);

    // Define the material for the image plane
    var imgMat = new BABYLON.StandardMaterial("imgMat", scene);
    imgMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
    imgMat.backFaceCulling = false;
    imgMat.diffuseTexture = new BABYLON.Texture("img/face" + imgNum + ".jpg", scene);
    imgPlane.material = imgMat;

    addText(name, location);

    window.setTimeout(function() {
        startPlacement(lat, long, 5/2, scene, applyImgToEarth);
    }, 2000);
}
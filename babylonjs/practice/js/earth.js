var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
    // Set scene and background color
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(1, 1, 1);

    // Create camera
    var mainCamera = new BABYLON.ArcRotateCamera("mainCamera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
    mainCamera.setPosition(new BABYLON.Vector3(0, 0, -10));
    scene.activeCamera = mainCamera;
    scene.activeCamera.attachControl(canvas);

    // Create earth
    var earth = BABYLON.Mesh.CreateSphere("Earth", 25, 5, scene);
    earth.position = new BABYLON.Vector3(3, 1, 0);
    earth.rotation.x = Math.PI;
    earth.rotation.y = Math.PI;

    // Define the material for the earth model
    var earthMat = new BABYLON.StandardMaterial("earthMat", scene);
    earthMat.emissiveColor = new BABYLON.Color3(0, 0.7, 1);
    earthMat.diffuseTexture = new BABYLON.Texture("textures/earthBW.gif", scene);
    earthMat.diffuseTexture.hasAlpha = true;
    earth.material = earthMat;

    // Create image plane
    var imgPlane = BABYLON.Mesh.CreatePlane("imgPlane", 2, scene, BABYLON.Mesh.DOUBLESIDE);
    imgPlane.position = new BABYLON.Vector3(-4, 1, 0);

    // Define the material for the image plane
    var imgMat = new BABYLON.StandardMaterial("imgMat", scene);
    imgMat.emissiveColor = new BABYLON.Color3(1, 0, 0);
    imgMat.backFaceCulling = false;
    imgPlane.material = imgMat;

    // Define child sphere to hold images
    var imgSphere = BABYLON.Mesh.CreateSphere("imgSphere", 25, 5.1, scene);
    imgSphere.material = new BABYLON.StandardMaterial("imgBg", scene);
    imgSphere.material.alpha = 0;
    imgSphere.parent = earth;

    var decal = drawDecal(1000, imgSphere, new BABYLON.Vector3(.1, .1, .1));
    decal.material = imgMat;

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

engine.runRenderLoop(function() {
    scene.render();
});

window.addEventListener("resize", function() {
    engine.resize();
});

addText("Bob", "San Jose, CA");
window.setTimeout(function() {
    rmText();
    moveEarth(new BABYLON.Vector3(0, 0, 0));
    //moveImg(new BABYLON.Vector3(0, 0, -3.5));
    //switchToFollowCam();
}, 3000);
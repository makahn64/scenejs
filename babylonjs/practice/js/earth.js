var PIC_HOLD_TIME = 3000;
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
    earthMat.diffuseTexture = new BABYLON.Texture("textures/earthTop1.jpeg", scene);
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

function addPerson(name, location, imgUrl, lat, long) {
    var imgPlane = BABYLON.Mesh.CreateDisc("imgPlane", 0.65, 50, scene);
    imgPlane.scaling.y = -1;
    imgPlane.position = new BABYLON.Vector3(-4.6, 0.2, -4);

    var imgMat = new BABYLON.StandardMaterial("imgMat", scene);
    imgMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
    imgMat.backFaceCulling = false;
    imgMat.diffuseTexture = new BABYLON.Texture(window.location.origin+'/scenejs/babylonjs/practice/img/'+imgUrl, scene);
    imgPlane.material = imgMat;

    addText(name, location);

    window.setTimeout(function() {
        startPlacement(lat, long, EARTH_RADIUS/2, scene, applyImgToEarth);
    }, PIC_HOLD_TIME);
}

var curIdx = 0;
var data;

function addPeople(peopleData) {
    data = peopleData;
    if (curIdx < peopleData.length) {
        addPerson(peopleData[curIdx].name, peopleData[curIdx].loc, peopleData[curIdx].imgUrl, peopleData[curIdx].lat, peopleData[curIdx].long);
    }
    curIdx++;
}

function addNextPerson() {
    if (curIdx < data.length) {
        addPerson(data[curIdx].name, data[curIdx].loc, data[curIdx].imgUrl, data[curIdx].lat, data[curIdx].long);
    }
    curIdx++;
}

window.onload = function() {
    angular.element(document.getElementById("renderCanvas")).scope().getPeople();
};
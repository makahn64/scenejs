var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {

    var scene = new BABYLON.Scene(engine);

    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    // Create camera
    var mainCamera = new BABYLON.ArcRotateCamera("mainCamera", -Math.PI / 2, Math.PI / 2.5, 84, BABYLON.Vector3.Zero(), scene);
    scene.activeCamera = mainCamera;
    scene.activeCamera.attachControl(canvas);

    // Create light
    var light = new BABYLON.PointLight("light", new BABYLON.Vector3(-5, 20, -50), scene);
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(1, 1, 1);

    var ground = BABYLON.Mesh.CreateGround("ground", 150, 100, 1, scene);
    var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseTexture = new BABYLON.Texture('img/academyLogoFloor.png', scene);
    groundMat.reflectionTexture = new BABYLON.MirrorTexture("mirror", 1024, scene, true);
    groundMat.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -10, 0, -1);
    groundMat.reflectionTexture.renderList = [];

    groundMat.reflectionFresnelParameters = new BABYLON.FresnelParameters();
    groundMat.reflectionFresnelParameters.power = 0.1;
    groundMat.reflectionFresnelParameters.bias = 0.2;

    groundMat.backFaceCulling = false;
    ground.material = groundMat;

    return scene;
};

var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});

var ticketHeight = 30;
var numTickets = 9;
var tickets = [];
var mainIdx = 0;
var curPos = new BABYLON.Vector3(0, ticketHeight/2, -30);

var xInc = 18;
var zInc = 6;
var yRot = 1.25;

// Place tickets initially
for(var i = 0; i < numTickets; i++) {
    var ticketNum = i + 1;
    var ticket = BABYLON.Mesh.CreatePlane("ticket"+ticketNum, ticketHeight, scene);
    ticket.scaling.x = 0.75;
    //ticket.setPositionWithLocalVector(new BABYLON.Vector3(curPos.x, curPos.y, curPos.z));
    ticket.position = new BABYLON.Vector3(curPos.x, curPos.y, curPos.z);

    if(i != mainIdx) {
        ticket.rotation.y = yRot;
    }

    curPos.x += xInc;
    curPos.z += zInc;

    var ticketMat = new BABYLON.StandardMaterial("ticketMat", scene);
    ticketMat.backFaceCulling = false;
    ticketMat.diffuseTexture = new BABYLON.Texture("img/t00" + ticketNum + ".jpg", scene);
    ticket.material = ticketMat;

    tickets.push(ticket);
    scene.getMaterialByName('groundMat').reflectionTexture.renderList.push(ticket);
}

// example of cropping with uv scaling/offsets
/*var ticket = BABYLON.Mesh.CreatePlane("ticket"+ticketNum, ticketHeight, scene);
ticket.scaling.x = 0.75;
ticket.position = new BABYLON.Vector3(-5, -ticketHeight/2 -1, 0);

var ticketMat = new BABYLON.StandardMaterial("ticketMat", scene);
ticketMat.backFaceCulling = false;
ticketMat.diffuseTexture = new BABYLON.Texture("img/t001.jpg", scene);
ticketMat.diffuseTexture.vOffset = 0.45;
ticketMat.diffuseTexture.vScale = 0.35;
ticket.material = ticketMat;*/

var flowDirection = 0;

function coverflow() {
    if(mainIdx == 0) {
        flowDirection = 1;
    }
    if(mainIdx == numTickets - 1) {
        flowDirection = -1;
    }

    var animations = [];
    for(var i = 0; i < numTickets; i++) {
        var newPos = new BABYLON.Vector3(tickets[i].position.x, tickets[i].position.y, tickets[i].position.z);
        newPos.x -= xInc * flowDirection;

        if(i < mainIdx) {
            newPos.z += zInc * flowDirection;
        }
        if(i > mainIdx) {
            newPos.z -= zInc * flowDirection;
        }
        if(i == mainIdx) {
            newPos.z += zInc;
        }
        animations.push(moveTicket(tickets[i], newPos, scene));

        if(i == mainIdx) {
            animations.push(rotateY(tickets[i], -1 * flowDirection * yRot, scene));
        }
        if(i == mainIdx + flowDirection) {
            animations.push(rotateY(tickets[i], 0, scene));
        }
    }

    mainIdx = mainIdx + flowDirection;
    waitForAnimations(animations, coverflow);
}

coverflow();
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {

    var scene = new BABYLON.Scene(engine);

    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    var mainCamera = new BABYLON.ArcRotateCamera("mainCamera", -Math.PI / 2, Math.PI / 2, 50, BABYLON.Vector3.Zero(), scene);
    scene.activeCamera = mainCamera;
    scene.activeCamera.attachControl(canvas);

    var ground = BABYLON.Mesh.CreateGround("ground", 150, 100, 1, scene);
    ground.position.y = -15;
    var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.ambientColor = new BABYLON.Color3(1, 1, 1);
    groundMat.reflectionTexture = new BABYLON.MirrorTexture("mirror", 1024, scene, true);
    groundMat.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1, 0, -15);
    groundMat.reflectionTexture.renderList = [];

    groundMat.reflectionFresnelParameters = new BABYLON.FresnelParameters();
    groundMat.reflectionFresnelParameters.power = 0.1;
    groundMat.reflectionFresnelParameters.bias = 0.2;

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
var numTickets = 5;
var tickets = [];
var mainIdx = 0;
var curPos = new BABYLON.Vector3(0, 0, 0);

var xInc = 40;
var zInc = 30;

// Place tickets
for(var i = 0; i < numTickets; i++) {
    var ticketNum = i + 1;
    var ticket = BABYLON.Mesh.CreatePlane("ticket"+ticketNum, ticketHeight, scene);
    ticket.scaling.x = 1.205764;
    ticket.position = new BABYLON.Vector3(curPos.x, curPos.y, curPos.z);

    curPos.x += xInc;
    curPos.z += zInc;

    var ticketMat = new BABYLON.StandardMaterial("ticketMat", scene);
    ticketMat.backFaceCulling = false;
    ticketMat.emissiveTexture = new BABYLON.Texture("img/ticket" + ticketNum + ".jpg", scene);

    ticketMat.emissiveTexture.vOffset = -0.305;
    ticketMat.emissiveTexture.vScale = 0.62;

    ticket.material = ticketMat;

    tickets.push(ticket);
    scene.getMaterialByName('groundMat').reflectionTexture.renderList.push(ticket);
}

var flowDirection = 0;
var startFov = scene.activeCamera.fov;

function coverflow() {
    var animations = [];

    // third param in zoomOutIn is hold time for image
    animations.push(zoomOutIn(startFov, 0.6, 0.75, 3, scene));
    if(mainIdx == 0) {
        flowDirection = 1;
    }
    if(mainIdx == numTickets - 1) {
        flowDirection = -1;
    }

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
        animations.push(moveTicketTimed(tickets[i], newPos, 1.5, scene));
    }

    mainIdx = mainIdx + flowDirection;
    waitForAnimations(animations, coverflow);
}

coverflow();
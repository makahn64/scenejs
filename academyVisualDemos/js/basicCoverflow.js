var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {

    var scene = new BABYLON.Scene(engine);

    scene.clearColor = new BABYLON.Color3(1, 1, 1);

    // Create camera
    var mainCamera = new BABYLON.ArcRotateCamera("mainCamera", -Math.PI / 2, Math.PI / 2, 50, BABYLON.Vector3.Zero(), scene);
    scene.activeCamera = mainCamera;
    scene.activeCamera.attachControl(canvas);

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
var curPos = new BABYLON.Vector3(0, 0, 0);

var xInc = 35;
var zInc = 30;

// Place tickets
for(var i = 0; i < numTickets; i++) {
    var ticketNum = i + 1;
    var ticket = BABYLON.Mesh.CreatePlane("ticket"+ticketNum, ticketHeight, scene);
    ticket.scaling.x = 1.15;
    ticket.position = new BABYLON.Vector3(curPos.x, curPos.y, curPos.z);

    curPos.x += xInc;
    curPos.z += zInc;

    var ticketMat = new BABYLON.StandardMaterial("ticketMat", scene);
    ticketMat.backFaceCulling = false;
    ticketMat.emissiveTexture = new BABYLON.Texture("img/t00" + ticketNum + ".jpg", scene);
    ticket.material = ticketMat;

    tickets.push(ticket);
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
var startFov = scene.activeCamera.fov;

function coverflow() {
    var animations = [];

    // third param in zoomOutIn is hold time for image
    animations.push(zoomOutIn(startFov, 0.35, 1.5, 3, scene));
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
        animations.push(moveTicket(tickets[i], newPos, scene));
    }

    mainIdx = mainIdx + flowDirection;
    waitForAnimations(animations, coverflow);
}

coverflow();
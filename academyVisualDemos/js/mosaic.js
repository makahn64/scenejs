var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {

    var scene = new BABYLON.Scene(engine);

    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    // Create camera
    var mainCamera = new BABYLON.ArcRotateCamera("mainCamera", -Math.PI / 2, 0.2, 120, BABYLON.Vector3.Zero(), scene);
    scene.activeCamera = mainCamera;
    scene.activeCamera.attachControl(canvas);

    // Create light
    var light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(-1, -2, -1), scene);
    light.position = new BABYLON.Vector3(20, 40, 20);
    light.intensity = 0.65;

    var ground = BABYLON.Mesh.CreateGround("ground", 150, 100, 1, scene);
    ground.recieveShadows = true;

    var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseTexture = new BABYLON.Texture('img/academyLogoFloor.png', scene);
    groundMat.specularPower = 12;
    groundMat.backFaceCulling = false;
    ground.material = groundMat;

    return scene;
};

var scene = createScene();
var light = scene.getLightByName("light");
var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
shadowGenerator.useVarianceShadowMap = true;

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});

var ticketHeight = 10;
var numTickets = 100;
var tickets = [];

function getRandStartPos() {
    return new BABYLON.Vector3(-150 + 300 * Math.random(), 125 + 175 * Math.random(), -100 + 200 * Math.random());
}

function getRandEndPos() {
    return new BABYLON.Vector3(-60 + 120 * Math.random(), 1 + 10 * Math.random(), -30 + 65 * Math.random());
}

// initialize tickets
for(var i = 0; i < numTickets; i++) {
    var ticketNum = i % 9 + 1;
    var ticket = BABYLON.Mesh.CreatePlane("ticket"+ticketNum, ticketHeight, scene);
    ticket.scaling.x = 0.75;
    ticket.position = getRandStartPos();
    ticket.rotation.x = Math.PI / 2;

    var ticketMat = new BABYLON.StandardMaterial("ticketMat", scene);
    ticketMat.backFaceCulling = false;
    ticketMat.diffuseTexture = new BABYLON.Texture("img/t00" + ticketNum + ".jpg", scene);
    ticketMat.specularPower = 64;
    ticket.material = ticketMat;

    tickets.push(ticket);
    shadowGenerator.getShadowMap().renderList.push(ticket);

    moveTicketTimed(ticket, getRandEndPos(), 1 + 4 * Math.random(), scene);
}
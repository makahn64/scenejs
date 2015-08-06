var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
    // Set scene and background color
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    // Create camera
    var mainCamera = new BABYLON.ArcRotateCamera("mainCamera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
    mainCamera.setPosition(new BABYLON.Vector3(0, 0, -10));
    scene.activeCamera = mainCamera;
    scene.activeCamera.attachControl(canvas);

    // Create light
    var light = new BABYLON.PointLight("light", new BABYLON.Vector3(-5, 10, -20), scene);
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(1, 1, 1);
    light.intensity = 0.75;

    // Create tickets
    var ticket1 = BABYLON.Mesh.CreatePlane("ticket1", 2, scene);
    ticket1.position = new BABYLON.Vector3(0, 0, 0);
    ticket1.scaling.y = 1.5;

    // Define the material for the ticket
    var ticketMat = new BABYLON.StandardMaterial("ticketMat", scene);
    ticketMat.backFaceCulling = false;
    ticketMat.diffuseTexture = new BABYLON.Texture("img/t001.jpg", scene);
    ticket1.material = ticketMat;

    // Animate ticket
    animateTicket("ticket1", 10, -10, scene);

    return scene;
};

var scene = createScene();


engine.runRenderLoop(function() {
    scene.render();
});

window.addEventListener("resize", function() {
    engine.resize();
});
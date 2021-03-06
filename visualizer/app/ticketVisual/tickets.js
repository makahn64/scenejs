var scene = undefined;
var engine = undefined;
var tickets;

function runScene() {
    var canvas = document.getElementById("renderCanvas");

    console.log(window.location.pathname);

    if(scene == undefined) {
        engine = new BABYLON.Engine(canvas, true);
        scene = new BABYLON.Scene(engine);

        scene.clearColor = new BABYLON.Color3(0, 0, 0);

        // Create camera
        var mainCamera = new BABYLON.ArcRotateCamera("mainCamera", -2, Math.PI / 2, 20, BABYLON.Vector3.Zero(), scene);
        scene.activeCamera = mainCamera;
        scene.activeCamera.attachControl(canvas);

        // Create light
        var light = new BABYLON.PointLight("light", new BABYLON.Vector3(-5, 10, -30), scene);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
        light.intensity = 0.75;

        var ground = BABYLON.Mesh.CreateGround("ground", 6, 6, 1, scene);
        ground.diffuseTexture = new BABYLON.Texture('img/academyLogo.png', scene);

        engine.runRenderLoop(function () {
            scene.render();
        });

        window.addEventListener("resize", function () {
            engine.resize();
        });

        scene.beforeRender = function() {
            for (var i = 0; i < tickets.length; i++) {
                move(tickets[i]);
            }
        };
    }

    tickets = [];
    for(var i = 0; i < 20; i++) {
        var newTicket = getRandTicket("ticket"+i, scene);
        tickets.push(newTicket);
    }
}

function clearScene() {
    for(var i = 0; i < tickets.length; i++) {
        scene.getMeshByName('ticket'+i).dispose();
    }
}

function getRandCoord() {
    return new BABYLON.Vector3(-10 + 20 * Math.random(), -15 + 30 * Math.random(), -10 + 20 * Math.random());
}

function getRandTicket(name, scene) {
    var coord = getRandCoord();
    var ticketNum = Math.floor(Math.random() * 9) + 1;

    var ticket = BABYLON.Mesh.CreatePlane(name, 4, scene);
    ticket.position = coord;
    ticket.scaling.y = 1.5;
    ticket.myYDirection = 0.5 - Math.random();

    var ticketMat = new BABYLON.StandardMaterial(name+"Mat", scene);
    ticketMat.backFaceCulling = false;
    ticketMat.diffuseTexture = new BABYLON.Texture("img/t00" + ticketNum +".jpg", scene);

    ticket.material = ticketMat;

    return ticket;
}

function move(ticket) {
    var yInc = 0.02;
    var y = ticket.position.y + yInc * ticket.myYDirection;

    if(y > 20 || y < -20) {
        ticket.myYDirection *= -1;
    }

    ticket.position.y = y;
}
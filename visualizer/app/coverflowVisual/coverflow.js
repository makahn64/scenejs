var scene = undefined;
var engine = undefined;
var tickets;

function runScene() {
    var canvas = document.getElementById("renderCanvas");

    if(scene == undefined) {
        engine = new BABYLON.Engine(canvas, true);
        scene = new BABYLON.Scene(engine);

        scene.clearColor = new BABYLON.Color3(1, 1, 1);

        // Create camera
        var mainCamera = new BABYLON.ArcRotateCamera("mainCamera", -Math.PI/2, Math.PI/2, 50, BABYLON.Vector3.Zero(), scene);
        scene.activeCamera = mainCamera;
        scene.activeCamera.attachControl(canvas);

        engine.runRenderLoop(function () {
            scene.render();
        });

        window.addEventListener("resize", function () {
            engine.resize();
        });
    }

    var ticketHeight = 30;
    var numTickets = 9;
    tickets = [];
    var mainIdx = 0;
    var curPos = new BABYLON.Vector3(0, 0, 0);

    var xInc = 35;
    var zInc = 30;

    // Place tickets
    for(var i = 0; i < numTickets; i++) {
        var ticketNum = i + 1;
        var ticket = BABYLON.Mesh.CreatePlane("ticket"+i, ticketHeight, scene);
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
}

function clearScene() {
    for(var i = 0; i < tickets.length; i++) {
        scene.getMeshByName('ticket'+i).dispose();
    }
}

function zoomOutIn(outFov, inFov, zoomTime, holdTime, scene) {
    var camera = scene.activeCamera;
    var fps = 30;
    var zoomedFrame = fps * zoomTime;
    var endFrame = zoomedFrame*2 + fps * holdTime;
    var startFov = camera.fov;

    var animation = new BABYLON.Animation("zoom", "fov", fps, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: startFov});
    keys.push({frame: zoomedFrame, value: outFov});
    keys.push({frame: zoomedFrame*2, value: inFov});
    keys.push({frame: endFrame, value: inFov});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);

    camera.animations.push(animation);
    scene.beginAnimation(camera, 0, endFrame);

    return animation;
}

function moveTicket(ticket, destVector, scene) {
    var animation = new BABYLON.Animation("moveTicket", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: ticket.position});
    keys.push({frame: 90, value: destVector});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);

    ticket.animations.push(animation);
    scene.beginAnimation(ticket, 0, 90);

    return animation;
}

function waitForAnimations(animations, callback) {
    var testAnimations = setInterval(function() {
        var allStopped = true;
        var idx;
        for(idx = 0; idx < animations.length; idx++) {
            if(animations[idx].isStopped() == false) {
                allStopped = false;
            }
        }
        if(allStopped) {
            clearInterval(testAnimations);
            callback();
        }
    }, 25);
}

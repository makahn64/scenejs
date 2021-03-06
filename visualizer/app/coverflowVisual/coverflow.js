var PIC_HOLD_TIME = 5;
var TRANSITION_TIME = 0.75;
var ZOOM_IN_FOV = 0.5;

var scene = undefined;
var engine = undefined;
var tickets;
var startFov;
var running;

function runScene(imgData) {
    running = true;

    var allPhotos = imgData.photos;
    var origin = 'http://aso.appdelegates.net';
    var ticketPhotos = [];
    for (var p = 0; p < allPhotos.length; p++) {
        if (allPhotos[p].url.indexOf('ticket') != -1) {
            ticketPhotos.push(allPhotos[p].url);
        }
    }

    var canvas = document.getElementById("renderCanvas");

    if(scene == undefined) {
        engine = new BABYLON.Engine(canvas, true);
        scene = new BABYLON.Scene(engine);

        scene.clearColor = new BABYLON.Color3(0, 0, 0);

        var mainCamera = new BABYLON.ArcRotateCamera("mainCamera", -Math.PI/2, Math.PI/2, 50, BABYLON.Vector3.Zero(), scene);
        scene.activeCamera = mainCamera;
        startFov = mainCamera.fov;
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

        var lensEffect = new BABYLON.LensRenderingPipeline('lens', {
            edge_blur: 1.0,
            chromatic_aberration: 1.0,
            distortion: 0,
            dof_focus_distance: 50
        }, scene, 1.0, mainCamera);

        engine.runRenderLoop(function () {
            scene.render();
        });

        window.addEventListener("resize", function () {
            engine.resize();
        });
    }

    scene.getMeshByName('ground').isVisible = true;

    if(tickets) {
        tickets.splice(0, tickets.length);
    }
    else {
        tickets = [];
    }

    var ticketHeight = 30;
    var numTickets = ticketPhotos.length;
    var mainIdx = 0;
    var curPos = new BABYLON.Vector3(0, 0, 0);
    var xInc = 35;
    var zInc = 30;

    for(var i = 0; i < numTickets; i++) {
        var ticket = BABYLON.Mesh.CreatePlane("ticket"+i, ticketHeight, scene);
        ticket.scaling.x = 1.15;
        ticket.position = new BABYLON.Vector3(curPos.x, curPos.y, curPos.z);

        curPos.x += xInc;
        curPos.z += zInc;

        var ticketMat = new BABYLON.StandardMaterial("ticketMat", scene);
        ticketMat.backFaceCulling = false;
        ticketMat.emissiveTexture = new BABYLON.Texture(origin + ticketPhotos[i], scene);
        ticketMat.emissiveTexture.vOffset = 0.4;
        ticketMat.emissiveTexture.vScale = 0.45;
        ticket.material = ticketMat;

        tickets.push(ticket);
        scene.getMaterialByName('groundMat').reflectionTexture.renderList.push(ticket);
    }

    var flowDirection = 0;
    function coverflow() {
        if(running == false) {
            return;
        }

        var animations = [];
        animations.push(zoomOutIn(startFov, ZOOM_IN_FOV, TRANSITION_TIME, PIC_HOLD_TIME, scene));

        if(mainIdx == 0) {
            flowDirection = 1;
        }
        if(mainIdx == numTickets - 1) {
            flowDirection = -1;
        }

        for(var i = 0; i < tickets.length; i++) {
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
            animations.push(moveTicketTimed(tickets[i], newPos, 2*TRANSITION_TIME, scene));
        }

        mainIdx = mainIdx + flowDirection;
        waitForAnimations(animations, coverflow);
    }

    coverflow();
}

function clearScene() {
    running = false;
    for(var i = 0; i < tickets.length; i++) {
        scene.getMeshByName('ticket'+i).dispose();
    }
    scene.getMaterialByName('groundMat').reflectionTexture.renderList = [];
    scene.getMeshByName('ground').isVisible = false;
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

function moveTicketTimed(ticket, destVector, time, scene) {
    var fps = 30;
    var endFrame = time * fps;

    var animation = new BABYLON.Animation("moveTicket", "position", fps, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: ticket.position});
    keys.push({frame: endFrame, value: destVector});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);

    ticket.animations.push(animation);
    scene.beginAnimation(ticket, 0, endFrame);

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

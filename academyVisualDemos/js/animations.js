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

function moveTicketTimed(ticket, destVector, time, scene) {
    var fps = 30;
    var totalFrames = fps * time;
    var animation = new BABYLON.Animation("moveTicket", "position", fps, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: ticket.position});
    keys.push({frame: totalFrames, value: destVector});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEIN);
    animation.setEasingFunction(easingFunc);

    ticket.animations.push(animation);
    scene.beginAnimation(ticket, 0, totalFrames);

    return animation;
}

function rotateY(ticket, yRot, scene) {
    var animation = new BABYLON.Animation("rotateY", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: ticket.rotation.y});
    keys.push({frame: 90, value: yRot});
    animation.setKeys(keys);

    ticket.animations.push(animation);
    scene.beginAnimation(ticket, 0, 90);

    return animation;
}

function zoom(fov, time, scene) {
    var camera = scene.activeCamera;
    var fps = 30;
    var totalFrames = fps * time;

    var animation = new BABYLON.Animation("zoom", "fov", fps, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: camera.fov});
    keys.push({frame: totalFrames, value: fov});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);

    camera.animations.push(animation);
    scene.beginAnimation(camera, 0, totalFrames);

    return animation;
}

function zoomAndHold(fov, timeZoom, timeHold, scene) {
    var camera = scene.activeCamera;
    var fps = 30;
    var zoomedFrame = fps * timeZoom;
    var endFrame = zoomedFrame + fps * timeHold;

    var animation = new BABYLON.Animation("zoom", "fov", fps, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: camera.fov});
    keys.push({frame: zoomedFrame, value: fov});
    keys.push({frame: endFrame, value: fov});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);

    camera.animations.push(animation);
    scene.beginAnimation(camera, 0, endFrame);

    return animation;
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

function moveCameraBeta(beta, time, scene) {
    var camera = scene.activeCamera;
    var fps = 30;
    var totalFrames = fps * time;

    var animation = new BABYLON.Animation("moveCameraBeta", "beta", fps, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: camera.beta});
    keys.push({frame: totalFrames, value: beta});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);

    camera.animations.push(animation);
    scene.beginAnimation(camera, 0, totalFrames);

    return animation;
}

function moveCameraAlpha(alpha, time, scene) {
    var camera = scene.activeCamera;
    var fps = 30;
    var totalFrames = fps * time;

    var animation = new BABYLON.Animation("moveCameraAlpha", "alpha", fps, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: camera.alpha});
    keys.push({frame: totalFrames, value: alpha});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);

    camera.animations.push(animation);
    scene.beginAnimation(camera, 0, totalFrames);

    return animation;
}

function zoomAround(scene) {
    var camera = scene.activeCamera;
    var start = camera.fov;

    var animation = new BABYLON.Animation("zoom", "fov", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: start});
    keys.push({frame: 90, value: 0.3});
    keys.push({frame: 210, value: 0.5});
    keys.push({frame: 350, value: 0.2});
    keys.push({frame: 480, value: 0.4});
    keys.push({frame: 550, value: 0.5});
    keys.push({frame: 640, value: 0.3});
    keys.push({frame: 800, value: 0.6});
    keys.push({frame: 890, value: 0.2});
    keys.push({frame: 1000, value: start});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.BackEase(0.5);
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);

    camera.animations.push(animation);
    scene.beginAnimation(camera, 0, 1000, true);

    return animation;
}

function moveCameraBetaAround(scene) {
    var camera = scene.activeCamera;
    var start = camera.beta;

    var animation = new BABYLON.Animation("moveCameraBeta", "beta", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: start});
    keys.push({frame: 90, value: 1});
    keys.push({frame: 210, value: 0.75});
    keys.push({frame: 350, value: 1.3});
    keys.push({frame: 480, value: 0.6});
    keys.push({frame: 550, value: 0.2});
    keys.push({frame: 640, value: 0.1});
    keys.push({frame: 800, value: 0.8});
    keys.push({frame: 890, value: 0.65});
    keys.push({frame: 1000, value: start});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);

    camera.animations.push(animation);
    scene.beginAnimation(camera, 0, 1000, true);

    return animation;
}

function moveCameraAlphaAround(scene) {
    var camera = scene.activeCamera;
    var start = camera.alpha;

    var animation = new BABYLON.Animation("moveCameraAlpha", "alpha", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: start});
    keys.push({frame: 90, value: -2.3});
    keys.push({frame: 210, value: -2});
    keys.push({frame: 350, value: -1});
    keys.push({frame: 480, value: -0.6});
    keys.push({frame: 550, value: -1.2});
    keys.push({frame: 640, value: -2.3});
    keys.push({frame: 800, value: -3});
    keys.push({frame: 890, value: -2});
    keys.push({frame: 1000, value: start});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.CubicEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);


    camera.animations.push(animation);
    scene.beginAnimation(camera, 0, 1000, true);

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
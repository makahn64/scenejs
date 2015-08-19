function moveTicket(ticket, destVector, scene) {
    var animation = new BABYLON.Animation("moveTicket", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: ticket.position});
    keys.push({frame: 90, value: destVector});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEOUT);
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
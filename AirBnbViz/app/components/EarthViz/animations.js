/**
 * Spins the earth to the given y-rotation
 * @param yRot {Number} new y-rotation (in radians)
 * @param scene {BABYLON.Scene}
 * @returns {BABYLON.Animation}
 */
function spinEarthY(yRot, scene) {
    var earth = scene.getMeshByName("earth");

    var animation = new BABYLON.Animation("spinEarthY", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: earth.rotation.y});
    keys.push({frame: 90, value: yRot});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);

    earth.animations.push(animation);
    scene.beginAnimation(earth, 0, 90);

    return animation;
}

/**
 * Creates an animation to move the image plane and executes it.
 * @param destVector {BABYLON.Vector3} destination vector
 * @param scene {BABYLON.Scene}
 * @returns {BABYLON.Animation}
 */
function moveImg(destVector, scene) {
    var imgPlane = scene.getMeshByName("imgPlane");

    var animation = new BABYLON.Animation("moveImg", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: imgPlane.position});
    keys.push({frame: 90, value: destVector});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEOUT);
    animation.setEasingFunction(easingFunc);

    imgPlane.animations.push(animation);
    scene.beginAnimation(imgPlane, 0, 90);

    return animation;
}

function rotateImgX(xRot, scene) {
    var imgPlane = scene.getMeshByName("imgPlane");

    var animation = new BABYLON.Animation("rotateImgX", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: imgPlane.rotation.x});
    keys.push({frame: 90, value: xRot});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);

    imgPlane.animations.push(animation);
    scene.beginAnimation(imgPlane, 0, 90);

    return animation;
}

/**
 * Scales the image plane to the scaling vector given in an animation.
 * @param scaleVector {BABYLON.Vector3} scaling vector
 * @param scene {BABYLON.Scene}
 * @returns {BABYLON.Animation}
 */
function scaleImg(scaleVector, scene) {
    var imgPlane = scene.getMeshByName("imgPlane");

    var animation = new BABYLON.Animation("scaleImg", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: imgPlane.scaling});
    keys.push({frame: 90, value: scaleVector});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.QuadraticEase();
    animation.setEasingFunction(easingFunc);

    imgPlane.animations.push(animation);
    scene.beginAnimation(imgPlane, 0, 90);

    return animation;
}

/**
 * Zooms in on the origin.
 * @param scene {BABYLON.Scene}
 * @returns {BABYLON.Animation}
 */
function zoomIn(scene) {
    var camera = scene.activeCamera;

    var animation = new BABYLON.Animation("zoomIn", "fov", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: camera.fov});
    keys.push({frame: 90, value: 0.3});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);

    camera.animations.push(animation);
    scene.beginAnimation(camera, 0, 90);

    return animation;
}

/**
 * Zooms out from the origin.
 * @param scene {BABYLON.Scene}
 * @returns {BABYLON.Animation}
 */
function zoomOut(scene) {
    var camera = scene.activeCamera;

    var animation = new BABYLON.Animation("zoomOut", "fov", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: camera.fov});
    keys.push({frame: 90, value: 0.8});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);

    camera.animations.push(animation);
    scene.beginAnimation(camera, 0, 90);

    return animation;
}

/**
 * Creates an animation to move the camera's target x position and executes it.
 * @param targetX {Number}
 * @param scene {BABYLON.Scene}
 * @returns {BABYLON.Animation}
 */
function moveCameraTargetX(targetX, scene) {
    var camera = scene.activeCamera;

    var animation = new BABYLON.Animation("moveCameraTargetX", "target.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: camera.target.x});
    keys.push({frame: 90, value: targetX});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);

    camera.animations.push(animation);
    scene.beginAnimation(camera, 0, 90);

    return animation;
}

/**
 * Moves the camera's beta angle.
 * @param beta {Number} angle in radians to move to
 * @param scene {BABYLON.Scene}
 * @returns {BABYLON.Animation}
 */
function moveCameraBeta(beta, scene) {
    var camera = scene.activeCamera;

    var animation = new BABYLON.Animation("moveCameraBeta", "beta", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: camera.beta});
    keys.push({frame: 90, value: beta});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);

    camera.animations.push(animation);
    scene.beginAnimation(camera, 0, 90);

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
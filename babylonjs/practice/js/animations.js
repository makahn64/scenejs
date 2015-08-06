/**
 * Creates an animation to move the earth and executes it.
 * @param destVector {BABYLON.Vector3} destination vector
 * @param scene {BABYLON.Scene}
 */
function moveEarth(destVector, scene) {
    var earth = scene.getMeshByName("Earth");

    var animation = new BABYLON.Animation("moveEarth", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: earth.position});
    keys.push({frame: 90, value: destVector});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);

    earth.animations.push(animation);
    scene.beginAnimation(earth, 0, 90);
}

/**
 * Spins the earth to the given y-rotation.
 * @param yRot {Number} new y-rotation
 * @param scene {BABYLON.Scene}
 */
function spinEarth(yRot, scene) {
    var earth = scene.getMeshByName("Earth");

    var animation = new BABYLON.Animation("spinEarth", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

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
}

/**
 * Creates an animation to move the image plane and executes it.
 * @param destVector {BABYLON.Vector3} destination vector
 * @param scene {BABYLON.Scene}
 */
function moveImg(destVector, scene) {
    var imgPlane = scene.getMeshByName("imgPlane");

    var animation = new BABYLON.Animation("moveImg", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: imgPlane.position});
    keys.push({frame: 90, value: destVector});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);

    imgPlane.animations.push(animation);
    scene.beginAnimation(imgPlane, 0, 90);
}

/**
 * Zooms in on the origin.
 * @param scene {BABYLON.Scene}
 */
function zoomIn(scene) {
    var camera = scene.activeCamera;

    var animation = new BABYLON.Animation("zoomIn", "fov", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

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
}

/**
 * Zooms out from the origin.
 * @param scene {BABYLON.Scene}
 */
function zoomOut(scene) {
    var camera = scene.activeCamera;

    var animation = new BABYLON.Animation("zoomOut", "fov", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: camera.fov});
    keys.push({frame: 90, value: 1});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);

    camera.animations.push(animation);
    scene.beginAnimation(camera, 0, 90);
}
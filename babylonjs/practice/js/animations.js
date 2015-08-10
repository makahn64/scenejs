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
 * Spins the earth to the given x-rotation
 * @param xRot {Number} new x-rotation (in radians)
 * @param scene {BABYLON.Scene}
 * @returns {BABYLON.Animation}
 */
function spinEarthX(xRot, scene) {
    var earth = scene.getMeshByName("earth");

    var animation = new BABYLON.Animation("spinEarthX", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: earth.rotation.x});
    keys.push({frame: 90, value: xRot});
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
    var easingFunc = new BABYLON.BounceEase(1, 5);
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
 * Creates an animation to move the camera and executes it.
 * @param destVector {BABYLON.Vector3}
 * @param scene {BABYLON.Scene}
 * @returns {BABYLON.Animation}
 */
function moveCamera(destVector, scene) {
    var camera = scene.activeCamera;

    var animation = new BABYLON.Animation("moveCamera", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: camera.position});
    keys.push({frame: 90, value: destVector});
    animation.setKeys(keys);

    // Attach easing function
    var easingFunc = new BABYLON.SineEase();
    easingFunc.setEasingMode(BABYLON.EasingFunction.EADINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunc);

    camera.animations.push(animation);
    scene.beginAnimation(camera, 0, 90);

    return animation;
}
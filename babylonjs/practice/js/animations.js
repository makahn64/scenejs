/** Creates an animation to move the earth and executes it.
 * @param destVector {BABYLON.Vector3} destination vector
 */
function moveEarth(destVector) {
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

/** Creates an animation to move the image plane and executes it.
 * @param destVector {BABYLON.Vector3} destination vector
 */
function moveImg(destVector) {
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
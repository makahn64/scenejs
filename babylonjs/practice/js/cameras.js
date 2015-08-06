/**
 * Creates a BABYLON.FollowCamera that follows the image plane and switches it to the active camera.
 */
function followImg() {
    var followCam = new BABYLON.FollowCamera("followCam", new BABYLON.Vector3(0, 0, 0), scene);
    var imgPlane = scene.getMeshByName("imgPlane");

    followCam.target = imgPlane;
    followCam.radius = 30;
    followCam.rotationOffset = 180;

    scene.activeCamera = followCam;
}
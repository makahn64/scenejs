/**
 * Sets up the scene for placement of the image on the earth.
 * @param lat {Number} latitude
 * @param long {Number} longitude
 * @param radius {Number} radius of earth mesh
 * @param scene {BABYLON.Scene}
 * @param callback
 */
function startPlacement(lat, long, radius, scene, callback) {
    var earth = scene.getMeshByName("earth");
    rmText();
    rotate = false;

    var relLat = Math.PI / 2 - lat * Math.PI / 180;
    var relLong = long * Math.PI / 180 - Math.PI / 2;
    var imgY = radius * Math.cos(relLat);
    var imgZ = -radius * Math.sin(relLat);
    var imgTilt = Math.PI / 2 - relLat;

    var animations = [];

    animations.push(spinEarthY(relLong, scene));
    animations.push(moveCameraTargetX(0, scene));
    animations.push(moveCameraBeta(relLat, scene));
    animations.push(moveImg(new BABYLON.Vector3(0, imgY, imgZ - 0.01), scene));
    animations.push(scaleImg(new BABYLON.Vector3(0.15, -0.15, 0), scene)); // y scale must be neg. for disc
    animations.push(rotateImgX(imgTilt, scene));
    animations.push(zoomIn(scene));

    waitForAnimations(animations, callback);
}

/**
 * Waits for all animations to complete before calling the callback function.
 * @param animations {Array.<BABYLON.Animation>}
 * @param callback
 */
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

function applyImgToEarth() {
    var scene = window.scene;
    var imgPlane = scene.getMeshByName("imgPlane");
    var earth = scene.getMeshByName("earth");

    earth.computeWorldMatrix();
    var earthMatrixInv = earth.getWorldMatrix().clone().invert();

    imgPlane.computeWorldMatrix();
    var imgMatrix = imgPlane.getWorldMatrix();

    var newImgMatrix = imgMatrix.multiply(earthMatrixInv);
    var newImgTRS = decomposeTRSMatrix(newImgMatrix);
    var earthTRS = decomposeTRSMatrix(earthMatrixInv);

    var xRot = imgPlane.rotation.x;

    imgPlane.rotation = earthTRS.rotation;
    imgPlane.rotation.x = xRot;
    imgPlane.position = newImgTRS.translation;
    imgPlane.scaling = newImgTRS.scaling;
    imgPlane.scaling.y *= -1;   // y scale must be neg. for disc

    imgPlane.parent = earth;

    imgPlane.id = '';
    imgPlane.name = '';

    var animations = [];
    animations.push(moveCameraTargetX(-3, scene));
    animations.push(moveCameraBeta(Math.PI / 2, scene));
    animations.push(zoomOut(scene));

    waitForAnimations(animations, addNextPerson);
    rotate = true;
}

function decomposeTRSMatrix(mtx) {
    var posX = mtx.m[12];
    var posY = mtx.m[13];
    var posZ = mtx.m[14];

    var xs = (mtx.m[0] * mtx.m[1] * mtx.m[2] * mtx.m[3]) < 0 ? -1 : 1;
    var ys = (mtx.m[4] * mtx.m[5] * mtx.m[6] * mtx.m[7]) < 0 ? -1 : 1;
    var zs = (mtx.m[8] * mtx.m[9] * mtx.m[10] * mtx.m[11]) < 0 ? -1 : 1;

    var scaleX = xs * Math.sqrt(mtx.m[0] * mtx.m[0] + mtx.m[1] * mtx.m[1] + mtx.m[2] * mtx.m[2]);
    var scaleY = ys * Math.sqrt(mtx.m[4] * mtx.m[4] + mtx.m[5] * mtx.m[5] + mtx.m[6] * mtx.m[6]);
    var scaleZ = zs * Math.sqrt(mtx.m[8] * mtx.m[8] + mtx.m[9] * mtx.m[9] + mtx.m[10] * mtx.m[10]);

    var rotationMatrix = BABYLON.Matrix.FromValues(
        mtx.m[0], mtx.m[1], mtx.m[2], 0,
        mtx.m[4], mtx.m[5], mtx.m[6], 0,
        mtx.m[8], mtx.m[9], mtx.m[10], 0,
        0, 0, 0, 1
    );

    // Normalize to remove scaling
    if(scaleX) {
        rotationMatrix.m[0] /= scaleX;
        rotationMatrix.m[1] /= scaleX;
        rotationMatrix.m[2] /= scaleX;
    }
    if(scaleY) {
        rotationMatrix.m[4] /= scaleY;
        rotationMatrix.m[5] /= scaleY;
        rotationMatrix.m[6] /= scaleY;
    }
    if(scaleZ) {
        rotationMatrix.m[8] /= scaleZ;
        rotationMatrix.m[9] /= scaleZ;
        rotationMatrix.m[10] /= scaleZ;
    }

    var rotX = Math.asin(-rotationMatrix.m[8]);
    var rotY = Math.atan2(rotationMatrix.m[8], rotationMatrix.m[10]);
    var rotZ = Math.atan2(rotationMatrix.m[1], rotationMatrix.m[5]);

    var result = {
        translation: new BABYLON.Vector3(posX, posY, posZ),
        rotation: new BABYLON.Vector3(rotX, rotY, rotZ),
        scaling: new BABYLON.Vector3(scaleX, scaleY, scaleZ)
    };

    return result;
}
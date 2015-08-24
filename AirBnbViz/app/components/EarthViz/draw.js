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
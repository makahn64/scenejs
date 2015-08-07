/**
 * Draw decal on a source mesh at a specific index of the source mesh. Adapted from BabylonJS CreateDecal method.
 *
 * @param idx {Number} index of 3D earth vertex to insert at
 * @param sourceMesh {BABYLON.Mesh} mesh to draw decal on
 * @param size {BABYLON.Vector3} size of decal
 */
function drawDecal(name, idx, sourceMesh, size) {
    var indices = sourceMesh.getIndices();
    var positions = sourceMesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    var normals = sourceMesh.getVerticesData(BABYLON.VertexBuffer.NormalKind);

    var position = BABYLON.Vector3.FromArray(positions, idx * 3);
    var normal = BABYLON.Vector3.FromArray(normals, idx * 3);

    var yaw = -Math.atan2(normal.z, normal.x) - Math.PI / 2;
    var len = Math.sqrt(normal.x * normal.x + normal.z * normal.z);
    var pitch = Math.atan2(normal.y, len);
    var angle = 0;

    var decalWorldMatrix = BABYLON.Matrix.RotationYawPitchRoll(yaw, pitch, angle).multiply(BABYLON.Matrix.Translation(position.x, position.y, position.z));
    var inverseDecalWorldMatrix = BABYLON.Matrix.Invert(decalWorldMatrix);
    var meshWorldMatrix = sourceMesh.getWorldMatrix();
    var transformMatrix = meshWorldMatrix.multiply(inverseDecalWorldMatrix);
    var vertexData = new BABYLON.VertexData();
    vertexData.indices = [];
    vertexData.positions = [];
    vertexData.normals = [];
    vertexData.uvs = [];

    var currentVertexDataIndex = 0;
    var extractDecalVector3 = function (indexId) {
        var vertexId = indices[indexId];
        var result = new BABYLON.PositionNormalVertex();
        result.position = new BABYLON.Vector3(positions[vertexId * 3], positions[vertexId * 3 + 1], positions[vertexId * 3 + 2]);
        // Send vector to decal local world
        result.position = BABYLON.Vector3.TransformCoordinates(result.position, transformMatrix);
        // Get normal
        result.normal = new BABYLON.Vector3(normals[vertexId * 3], normals[vertexId * 3 + 1], normals[vertexId * 3 + 2]);
        return result;
    };

    var clip = function (vertices, axis) {
        if (vertices.length === 0) {
            return vertices;
        }
        var clipSize = 0.5 * Math.abs(BABYLON.Vector3.Dot(size, axis));
        var clipVertices = function (v0, v1) {
            var clipFactor = BABYLON.Vector3.GetClipFactor(v0.position, v1.position, axis, clipSize);
            return new BABYLON.PositionNormalVertex(BABYLON.Vector3.Lerp(v0.position, v1.position, clipFactor), BABYLON.Vector3.Lerp(v0.normal, v1.normal, clipFactor));
        };
        var result = new Array();
        for (var index = 0; index < vertices.length; index += 3) {
            var v1Out;
            var v2Out;
            var v3Out;
            var total = 0;
            var nV1, nV2, nV3, nV4;
            var d1 = BABYLON.Vector3.Dot(vertices[index].position, axis) - clipSize;
            var d2 = BABYLON.Vector3.Dot(vertices[index + 1].position, axis) - clipSize;
            var d3 = BABYLON.Vector3.Dot(vertices[index + 2].position, axis) - clipSize;
            v1Out = d1 > 0;
            v2Out = d2 > 0;
            v3Out = d3 > 0;
            total = (v1Out ? 1 : 0) + (v2Out ? 1 : 0) + (v3Out ? 1 : 0);
            switch (total) {
                case 0:
                    result.push(vertices[index]);
                    result.push(vertices[index + 1]);
                    result.push(vertices[index + 2]);
                    break;
                case 1:
                    if (v1Out) {
                        nV1 = vertices[index + 1];
                        nV2 = vertices[index + 2];
                        nV3 = clipVertices(vertices[index], nV1);
                        nV4 = clipVertices(vertices[index], nV2);
                    }
                    if (v2Out) {
                        nV1 = vertices[index];
                        nV2 = vertices[index + 2];
                        nV3 = clipVertices(vertices[index + 1], nV1);
                        nV4 = clipVertices(vertices[index + 1], nV2);
                        result.push(nV3);
                        result.push(nV2.clone());
                        result.push(nV1.clone());
                        result.push(nV2.clone());
                        result.push(nV3.clone());
                        result.push(nV4);
                        break;
                    }
                    if (v3Out) {
                        nV1 = vertices[index];
                        nV2 = vertices[index + 1];
                        nV3 = clipVertices(vertices[index + 2], nV1);
                        nV4 = clipVertices(vertices[index + 2], nV2);
                    }
                    result.push(nV1.clone());
                    result.push(nV2.clone());
                    result.push(nV3);
                    result.push(nV4);
                    result.push(nV3.clone());
                    result.push(nV2.clone());
                    break;
                case 2:
                    if (!v1Out) {
                        nV1 = vertices[index].clone();
                        nV2 = clipVertices(nV1, vertices[index + 1]);
                        nV3 = clipVertices(nV1, vertices[index + 2]);
                        result.push(nV1);
                        result.push(nV2);
                        result.push(nV3);
                    }
                    if (!v2Out) {
                        nV1 = vertices[index + 1].clone();
                        nV2 = clipVertices(nV1, vertices[index + 2]);
                        nV3 = clipVertices(nV1, vertices[index]);
                        result.push(nV1);
                        result.push(nV2);
                        result.push(nV3);
                    }
                    if (!v3Out) {
                        nV1 = vertices[index + 2].clone();
                        nV2 = clipVertices(nV1, vertices[index]);
                        nV3 = clipVertices(nV1, vertices[index + 1]);
                        result.push(nV1);
                        result.push(nV2);
                        result.push(nV3);
                    }
                    break;
                case 3:
                    break;
            }
        }
        return result;
    };

    for (var index = 0; index < indices.length; index += 3) {
        var faceVertices = new Array();
        faceVertices.push(extractDecalVector3(index));
        faceVertices.push(extractDecalVector3(index + 1));
        faceVertices.push(extractDecalVector3(index + 2));
        // Clip
        faceVertices = clip(faceVertices, new BABYLON.Vector3(1, 0, 0));
        faceVertices = clip(faceVertices, new BABYLON.Vector3(-1, 0, 0));
        faceVertices = clip(faceVertices, new BABYLON.Vector3(0, 1, 0));
        faceVertices = clip(faceVertices, new BABYLON.Vector3(0, -1, 0));
        faceVertices = clip(faceVertices, new BABYLON.Vector3(0, 0, 1));
        faceVertices = clip(faceVertices, new BABYLON.Vector3(0, 0, -1));
        if (faceVertices.length === 0) {
            continue;
        }
        // Add UVs and get back to world
        var localRotationMatrix = BABYLON.Matrix.RotationYawPitchRoll(yaw, pitch, angle);
        for (var vIndex = 0; vIndex < faceVertices.length; vIndex++) {
            var vertex = faceVertices[vIndex];
            vertexData.indices.push(currentVertexDataIndex);
            vertex.position.toArray(vertexData.positions, currentVertexDataIndex * 3);
            vertex.normal.toArray(vertexData.normals, currentVertexDataIndex * 3);
            vertexData.uvs.push(0.5 + vertex.position.x / size.x);
            vertexData.uvs.push(0.5 + vertex.position.y / size.y);
            currentVertexDataIndex++;
        }
    }
    // Return mesh
    var decal = new BABYLON.Mesh(name, sourceMesh.getScene(), sourceMesh);
    vertexData.myApplyToMesh(decal);
    decal.position = position.clone();
    decal.rotation = new BABYLON.Vector3(pitch, yaw, angle);
    return vertexData;
}

BABYLON.VertexData.prototype.myApplyToMesh = function(mesh, updatable) {
    if (this.positions) {
        mesh.mySetVerticesData(BABYLON.VertexBuffer.PositionKind, this.positions, updatable);
    }
    if (this.normals) {
        mesh.mySetVerticesData(BABYLON.VertexBuffer.NormalKind, this.normals, updatable);
    }
    if (this.uvs) {
        mesh.mySetVerticesData(BABYLON.VertexBuffer.UVKind, this.uvs, updatable);
    }
    if (this.uvs2) {
        mesh.mySetVerticesData(BABYLON.VertexBuffer.UV2Kind, this.uvs2, updatable);
    }
    if (this.uvs3) {
        mesh.mySetVerticesData(BABYLON.VertexBuffer.UV3Kind, this.uvs3, updatable);
    }
    if (this.uvs4) {
        mesh.mySetVerticesData(BABYLON.VertexBuffer.UV4Kind, this.uvs4, updatable);
    }
    if (this.uvs5) {
        mesh.mySetVerticesData(BABYLON.VertexBuffer.UV5Kind, this.uvs5, updatable);
    }
    if (this.uvs6) {
        mesh.mySetVerticesData(BABYLON.VertexBuffer.UV6Kind, this.uvs6, updatable);
    }
    if (this.colors) {
        mesh.mySetVerticesData(BABYLON.VertexBuffer.ColorKind, this.colors, updatable);
    }
    if (this.matricesIndices) {
        mesh.mySetVerticesData(BABYLON.VertexBuffer.MatricesIndicesKind, this.matricesIndices, updatable);
    }
    if (this.matricesWeights) {
        mesh.mySetVerticesData(BABYLON.VertexBuffer.MatricesWeightsKind, this.matricesWeights, updatable);
    }
    if (this.indices) {
        mesh.setIndices(this.indices);
    }
}

BABYLON.Mesh.prototype.mySetVerticesData = function(kind, data, updatable) {
    console.log(this._geometry);
    if(!this._geometry) {
        var vertexData = new BABYLON.VertexData();
        vertexData.set(data, kind);
        var scene = this.getScene();
        new BABYLON.Geometry(BABYLON.Geometry.RandomId(), scene, vertexData, updatable, this);
    }
    else {
        this._geometry.setVerticesData(kind, data, updatable);
    }
}

/**
 * Sets up the scene for placement of the image on the earth.
 * @param scene {BABYLON.Scene}
 * @param callback
 */
function setUpForPlacement(scene, callback) {
    rmText();
    rotate = false;

    var animations = [];
    animations.push(spinEarth(Math.PI / 2, scene));
    animations.push(moveEarth(new BABYLON.Vector3(0, 0, 0), scene));
    animations.push(moveImg(new BABYLON.Vector3(0, 0, -3), scene));
    animations.push(scaleImg(new BABYLON.Vector3(0.25, 0.25, 0), scene));
    animations.push(zoomIn(scene));

    waitForAnimations(animations, callback);
}

/**
 * Waits for all animations to complete before calling the callback function.
 * @param animations {Array.<BABYLON.Animation>} array of animations
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
    var imgSphere = scene.getMeshByName("imgSphere");

    console.log(imgPlane);

    var imgSphereMatrix = imgSphere.getWorldMatrix().clone();
    imgSphereMatrix.invert();

    var imgPlaneMatrix = imgPlane.getWorldMatrix();

    var newImgMatrix = imgPlaneMatrix.multiply(imgSphereMatrix);
    var result = decomposeMatrix(newImgMatrix);

    //imgPlane.position = result.translation;
    //imgPlane.rotation = result.rotation;
    //imgPlane.scaling = result.scaling;
}

function decomposeMatrix(matrix) {
    var innerMatrix = matrix.clone();

    // Translation part of the matrix
    var positionX = innerMatrix.m[12];
    var positionY = innerMatrix.m[13];
    var positionZ = innerMatrix.m[14];

    var translation = new BABYLON.Vector3(positionX, positionY, positionZ);
    var translationMatrixInv = BABYLON.Matrix.Translation(-positionX, -positionY, -positionZ);

    // Scaling
    var scalingX = Math.sqrt(innerMatrix.m[0] * innerMatrix.m[0] + innerMatrix.m[1] * innerMatrix.m[1] + innerMatrix.m[2] * innerMatrix.m[2]);
    var scalingY = Math.sqrt(innerMatrix.m[4] * innerMatrix.m[4] + innerMatrix.m[5] * innerMatrix.m[5] + innerMatrix.m[6] * innerMatrix.m[6]);
    var scalingZ = Math.sqrt(innerMatrix.m[8] * innerMatrix.m[8] + innerMatrix.m[9] * innerMatrix.m[9] + innerMatrix.m[10] * innerMatrix.m[10]);

    var scaling = new BABYLON.Vector3(scalingX, scalingY, scalingZ);

    // Rotation
    var rotationMatrix = innerMatrix.multiply(translationMatrixInv);

    // Normalize to remove scaling.
    if (scalingX) {
        rotationMatrix.m[0] /= scalingX;
        rotationMatrix.m[1] /= scalingX;
        rotationMatrix.m[2] /= scalingX;
    }
    if (scalingY) {
        rotationMatrix.m[4] /= scalingY;
        rotationMatrix.m[5] /= scalingY;
        rotationMatrix.m[6] /= scalingY;
    }
    if (scalingZ) {
        rotationMatrix.m[8] /= scalingZ;
        rotationMatrix.m[9] /= scalingZ;
        rotationMatrix.m[10] /= scalingZ;
    }

    var rotationX = Math.asin(-rotationMatrix.m[9]);
    var rotationY = Math.atan2(rotationMatrix.m[8], rotationMatrix.m[10]);
    var rotationZ = Math.atan2(rotationMatrix.m[1], rotationMatrix.m[5]);

    var rotation = new BABYLON.Vector3(rotationX, rotationY, rotationZ);

    var result = {
        translation: translation,
        scaling: scaling,
        rotation: rotation
    };

    return result;
}

function applyImg() {
    var scene = window.scene;
    var imgPlane = scene.getMeshByName("imgPlane");
    var imgSphere = scene.getMeshByName("imgSphere");

    var indices = imgSphere.getIndices();
    var positions = imgSphere.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    var normals = imgSphere.getVerticesData(BABYLON.VertexBuffer.NormalKind);

    var position = imgPlane.position;
    // get normal
    var normal0 = BABYLON.Vector3.FromArray(normals, indices[0] * 3);
    var normal1 = BABYLON.Vector3.FromArray(normals, indices[1] * 3);
    var normal2 = BABYLON.Vector3.FromArray(normals, indices[2] * 3);
    var normal = pickInfo.getNormal();

    var decal = new BABYLON.Mesh.CreateDecal("decal", pickInfo.pickedMesh, position, normal, new BABYLON.Vector3(0.5, 0.5, 0.5));
    decal.material = scene.getMaterialByName("imgMat");

    /*var yaw = -Math.atan2(normal.z, normal.x) - Math.PI / 2;
    var len = Math.sqrt(normal.x * normal.x + normal.z * normal.z);
    var pitch = Math.atan2(normal.y, len);
    var angle = 0;

    var decalWorldMatrix = BABYLON.Matrix.RotationYawPitchRoll(yaw, pitch, angle).multiply(BABYLON.Matrix.Translation(position.x, position.y, position.z));
    var inverseDecalWorldMatrix = BABYLON.Matrix.Invert(decalWorldMatrix);
    var meshWorldMatrix = sourceMesh.getWorldMatrix();
    var transformMatrix = meshWorldMatrix.multiply(inverseDecalWorldMatrix);
    var vertexData = new BABYLON.VertexData();
    vertexData.indices = [];
    vertexData.positions = [];
    vertexData.normals = [];
    vertexData.uvs = [];

    var currentVertexDataIndex = 0;
    var extractDecalVector3 = function (indexId) {
        var vertexId = indices[indexId];
        var result = new BABYLON.PositionNormalVertex();
        result.position = new BABYLON.Vector3(positions[vertexId * 3], positions[vertexId * 3 + 1], positions[vertexId * 3 + 2]);
        // Send vector to decal local world
        result.position = BABYLON.Vector3.TransformCoordinates(result.position, transformMatrix);
        // Get normal
        result.normal = new BABYLON.Vector3(normals[vertexId * 3], normals[vertexId * 3 + 1], normals[vertexId * 3 + 2]);
        return result;
    };

    var clip = function (vertices, axis) {
        if (vertices.length === 0) {
            return vertices;
        }
        var clipSize = 0.5 * Math.abs(BABYLON.Vector3.Dot(size, axis));
        var clipVertices = function (v0, v1) {
            var clipFactor = BABYLON.Vector3.GetClipFactor(v0.position, v1.position, axis, clipSize);
            return new BABYLON.PositionNormalVertex(BABYLON.Vector3.Lerp(v0.position, v1.position, clipFactor), BABYLON.Vector3.Lerp(v0.normal, v1.normal, clipFactor));
        };
        var result = new Array();
        for (var index = 0; index < vertices.length; index += 3) {
            var v1Out;
            var v2Out;
            var v3Out;
            var total = 0;
            var nV1, nV2, nV3, nV4;
            var d1 = BABYLON.Vector3.Dot(vertices[index].position, axis) - clipSize;
            var d2 = BABYLON.Vector3.Dot(vertices[index + 1].position, axis) - clipSize;
            var d3 = BABYLON.Vector3.Dot(vertices[index + 2].position, axis) - clipSize;
            v1Out = d1 > 0;
            v2Out = d2 > 0;
            v3Out = d3 > 0;
            total = (v1Out ? 1 : 0) + (v2Out ? 1 : 0) + (v3Out ? 1 : 0);
            switch (total) {
                case 0:
                    result.push(vertices[index]);
                    result.push(vertices[index + 1]);
                    result.push(vertices[index + 2]);
                    break;
                case 1:
                    if (v1Out) {
                        nV1 = vertices[index + 1];
                        nV2 = vertices[index + 2];
                        nV3 = clipVertices(vertices[index], nV1);
                        nV4 = clipVertices(vertices[index], nV2);
                    }
                    if (v2Out) {
                        nV1 = vertices[index];
                        nV2 = vertices[index + 2];
                        nV3 = clipVertices(vertices[index + 1], nV1);
                        nV4 = clipVertices(vertices[index + 1], nV2);
                        result.push(nV3);
                        result.push(nV2.clone());
                        result.push(nV1.clone());
                        result.push(nV2.clone());
                        result.push(nV3.clone());
                        result.push(nV4);
                        break;
                    }
                    if (v3Out) {
                        nV1 = vertices[index];
                        nV2 = vertices[index + 1];
                        nV3 = clipVertices(vertices[index + 2], nV1);
                        nV4 = clipVertices(vertices[index + 2], nV2);
                    }
                    result.push(nV1.clone());
                    result.push(nV2.clone());
                    result.push(nV3);
                    result.push(nV4);
                    result.push(nV3.clone());
                    result.push(nV2.clone());
                    break;
                case 2:
                    if (!v1Out) {
                        nV1 = vertices[index].clone();
                        nV2 = clipVertices(nV1, vertices[index + 1]);
                        nV3 = clipVertices(nV1, vertices[index + 2]);
                        result.push(nV1);
                        result.push(nV2);
                        result.push(nV3);
                    }
                    if (!v2Out) {
                        nV1 = vertices[index + 1].clone();
                        nV2 = clipVertices(nV1, vertices[index + 2]);
                        nV3 = clipVertices(nV1, vertices[index]);
                        result.push(nV1);
                        result.push(nV2);
                        result.push(nV3);
                    }
                    if (!v3Out) {
                        nV1 = vertices[index + 2].clone();
                        nV2 = clipVertices(nV1, vertices[index]);
                        nV3 = clipVertices(nV1, vertices[index + 1]);
                        result.push(nV1);
                        result.push(nV2);
                        result.push(nV3);
                    }
                    break;
                case 3:
                    break;
            }
        }
        return result;
    };

    for (var index = 0; index < indices.length; index += 3) {
        var faceVertices = new Array();
        faceVertices.push(extractDecalVector3(index));
        faceVertices.push(extractDecalVector3(index + 1));
        faceVertices.push(extractDecalVector3(index + 2));
        // Clip
        faceVertices = clip(faceVertices, new BABYLON.Vector3(1, 0, 0));
        faceVertices = clip(faceVertices, new BABYLON.Vector3(-1, 0, 0));
        faceVertices = clip(faceVertices, new BABYLON.Vector3(0, 1, 0));
        faceVertices = clip(faceVertices, new BABYLON.Vector3(0, -1, 0));
        faceVertices = clip(faceVertices, new BABYLON.Vector3(0, 0, 1));
        faceVertices = clip(faceVertices, new BABYLON.Vector3(0, 0, -1));
        if (faceVertices.length === 0) {
            continue;
        }
        // Add UVs and get back to world
        var localRotationMatrix = BABYLON.Matrix.RotationYawPitchRoll(yaw, pitch, angle);
        for (var vIndex = 0; vIndex < faceVertices.length; vIndex++) {
            var vertex = faceVertices[vIndex];
            vertexData.indices.push(currentVertexDataIndex);
            vertex.position.toArray(vertexData.positions, currentVertexDataIndex * 3);
            vertex.normal.toArray(vertexData.normals, currentVertexDataIndex * 3);
            vertexData.uvs.push(0.5 + vertex.position.x / size.x);
            vertexData.uvs.push(0.5 + vertex.position.y / size.y);
            currentVertexDataIndex++;
        }
    }
    // Return mesh
    var decal = new BABYLON.Mesh(name, sourceMesh.getScene(), sourceMesh);
    vertexData.myApplyToMesh(decal);
    decal.position = position.clone();
    decal.rotation = new BABYLON.Vector3(pitch, yaw, angle);
    return vertexData;*/
}
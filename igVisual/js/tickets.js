function runScene(igData, siteOrigin) {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    console.log(igData);

    var createScene = function () {
        // Set scene and background color
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(0, 0, 0);

        // Create camera
        var mainCamera = new BABYLON.ArcRotateCamera("mainCamera", -2, Math.PI / 2, 20, BABYLON.Vector3.Zero(), scene);
        scene.activeCamera = mainCamera;
        scene.activeCamera.attachControl(canvas);

        // Create light
        var light = new BABYLON.PointLight("light", new BABYLON.Vector3(-5, 10, -30), scene);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
        light.intensity = 0.75;

        return scene;
    };

    var scene = createScene();

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });

    function getRandCoord() {
        return new BABYLON.Vector3(-10 + 20 * Math.random(), -15 + 30 * Math.random(), -10 + 20 * Math.random());
    }

    function getInstagram(idx, scene) {
        var coord = getRandCoord();
        var id = "ig" + i;
        var imgUrl = siteOrigin + igData[i].url;

        var ig = new BABYLON.Mesh(id, scene);
        var indices = [], positions = [], normals = [], uvs = [];
        var halfSize = 2;

        positions.push(-halfSize, -halfSize, 0);
        normals.push(0, 0, -1.0);
        uvs.push(0.0, 0.0);
        positions.push(halfSize, -halfSize, 0);
        normals.push(0, 0, -1.0);
        uvs.push(1.0, 0.0);
        positions.push(halfSize, -halfSize/2, 0);
        normals.push(0, 0, -1.0);
        uvs.push(1.0, 0.25);
        positions.push(-halfSize, -halfSize/2, 0);
        normals.push(0, 0, -1.0);
        uvs.push(0.0, 0.25);

        positions.push(halfSize, halfSize, 0);
        normals.push(0, 0, -1.0);
        uvs.push(1.0, 1.0);
        positions.push(-halfSize, halfSize, 0);
        normals.push(0, 0, -1.0);
        uvs.push(0.0, 1.0);

        indices.push(0);
        indices.push(1);
        indices.push(2);
        indices.push(0);
        indices.push(2);
        indices.push(3);
        indices.push(3);
        indices.push(2);
        indices.push(4);
        indices.push(3);
        indices.push(4);
        indices.push(5);

        ig.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions, true);
        ig.setVerticesData(BABYLON.VertexBuffer.NormalKind, normals, true);
        ig.setVerticesData(BABYLON.VertexBuffer.UVKind, uvs, true);
        ig.setIndices(indices);

        ig.position = coord;
        ig.scaling.y = 1.5;
        ig.myYDirection = 0.5 - Math.random();

        var thisIgData = igData[i].data.instagram;
        var username = thisIgData.user.username;
        var fullname = thisIgData.user['full_name'];

        var text = new BABYLON.DynamicTexture("", 512, scene, true);
        var context = text.getContext();
        text.drawText(fullname+' @'+username, null, 455, "bold 30px Segoe UI", 'black', 'white');

        var textMat = new BABYLON.StandardMaterial(id + "TxtMat", scene);
        textMat.backFaceCulling = false;
        textMat.diffuseTexture = text;

        var imgMat = new BABYLON.StandardMaterial(id + "ImgMat", scene);
        imgMat.backFaceCulling = false;
        imgMat.diffuseTexture = new BABYLON.Texture(imgUrl, scene);

        var multiMat = new BABYLON.MultiMaterial(id + "MultiMat", scene);
        multiMat.subMaterials.push(imgMat);
        multiMat.subMaterials.push(textMat);

        ig.material = multiMat;
        ig.subMeshes = [];
        var verticesCount = ig.getTotalVertices();
        ig.subMeshes.push(new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, ig));
        ig.subMeshes.push(new BABYLON.SubMesh(0, 0, verticesCount, 6, 6, ig));

        return ig;
    }

    function move(ig) {
        var yInc = 0.02;
        var y = ig.position.y + yInc * ig.myYDirection;

        if (y > 20 || y < -20) {
            ig.myYDirection *= -1;
        }

        ig.position.y = y;
    }

    var igs = [];
    // limits number of instagrams in the scene to 25
    for(var i = 0; i < igData.length && i < 50; i++) {
        var newIg = getInstagram(i, scene);
        igs.push(newIg);
    }

    scene.beforeRender = function() {
        for(var i = 0; i < igs.length; i++) {
            move(igs[i]);
        }
     };
}
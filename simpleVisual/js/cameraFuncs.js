/**
 * Functions to control/manipulate the trackball camera.
 */

function startOrbit() {
    scene.getNode("camera", function(camera) {
        camera._tickOrbit = scene.on("tick", function() {
            camera.addRotation({x:0, y:1, z:0, angle:0.1});
        });
    });
}

function stopOrbit() {
    scene.getNode("camera", function(camera) {
        scene.off(camera._tickOrbit);
    });
}

function zoomIn(callback) {
    scene.getNode("camera", function(camera) {
        camera._tickZoom = scene.on("tick", function() {
            // Number to add zoom by should be the camera's zoomSensitivity
            camera.addZoom(-0.02);
            if(camera.getZoom() == 0) {
                stopZoom();
                if(typeof callback === "function")
                    callback(rmImgFromBody);
            }
        });
    });
}

function zoomOut(callback) {
    scene.getNode("camera", function(camera) {
        camera._tickZoom = scene.on("tick", function() {
            // Number to add zoom by should be the camera's zoomSensitivity
            camera.addZoom(0.02);
            if(camera.getZoom() == 1) {
                stopZoom();
                if(typeof callback === "function")
                    callback();
            }
        });
    });
}

function stopZoom() {
    scene.getNode("camera", function(camera) {
        scene.off(camera._tickZoom);
    });
}
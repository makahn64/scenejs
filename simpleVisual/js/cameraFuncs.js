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

function startZoom() {
    scene.getNode("camera", function(camera) {
        camera._tickZoom = scene.on("tick", function() {
            camera.addZoom(0.1);
        });
    });
}

function stopZoom() {
    scene.getNode("camera", function(camera) {
        scene.off(camera._tickZoom);
    });
}
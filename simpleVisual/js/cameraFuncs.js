/**
 * Functions to control/manipulate the trackball camera
 */
function startOrbit() {
    scene.getNode("camera", function(camera) {
        camera._tick = scene.on("tick", function() {
            camera.addRotation({x:0, y:1, z:0, angle:0.1});
        });
    });
}

function stopOrbit() {
    scene.getNode("camera", function(camera) {
        scene.off(camera._tick);
    });
}
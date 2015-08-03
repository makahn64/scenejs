/**
 * Functions for movement of and changes to nodes within the canvas.
 */

function addImgToEarth(callback) {
    scene.getNode("peopleLayer", function(peopleLayer) {
        peopleLayer.addNode({
            type:"translate",
            x:0, z:2.04,
            nodes:[{
                type:"scale",
                x:-0.2, y:-0.2, z:0.2,
                nodes:[{
                    type: "texture",
                    src: "img/face.jpg",
                    nodes: [{
                        type: "geometry/plane",
                        width: 1, height: 1
                    }]
                }]
            }]
        });
    });
    if (typeof callback === "function")
        callback(zoomOut);
}

function moveEarth() {
    ;
}
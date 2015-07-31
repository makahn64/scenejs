SceneJS.setConfigs({
    pluginPath:"./plugins"
});

// TODO: scale to window size by altering canvas

var scene = SceneJS.createScene({
    nodes:[{
        type: "lights",
        id: "myLights",
        lights: [{
            mode: "ambient",
            color: {r: 1.0, g: 1.0, b: 1.0}
        }],

        nodes: [{
            type:"cameras/trackball",
            id:"camera",
            zoom:0,
            zoomSensitivity:0.02,
            input:true,
            orbit:true,


            nodes:[{
                type: "translate",
                x:2, y: 1,
                id: "earth",

                nodes: [{
                    type: "models/space/planets/cartoonearth",
                    id:"earthModel",
                    rotate:true
                }]
            }]
        }, {
            type: "translate",
            id: "personNode",
            x: -5, y:0, z:0,

            nodes:[{
                type:"scale",
                id:"personScale",
                x:1, y:1, z:1
            }]
        }]
    }]
});

startOrbit();

/* Center the image and globe */
window.setTimeout(function() {
    // Add image to personNode
    scene.getNode("personScale", function(personScale) {
        // TODO: add text stuff
        personScale.addNode({
            type: "texture",
            src: "img/face.jpg",
            nodes: [{
                type: "geometry/plane",
                width: 1, height: 1
            }]
        });
    });
    scene.getNode("personNode", function(personNode) {
        // TODO: make movements more fluid, maybe using tween.js
        // Move person to center
        var x = -5, z = 0;
        var inc = 0.04;
        scene.on("tick", function() {
            if (x < 0)
                x += inc;
            if (z < 2.04)  // to keep image in front of earth
                z += inc;
            personNode.set({x:x, z:z});
        });
    });

    scene.getNode("earth", function(earth) {
        // Move earth to center
        var x = 2, y = 1;
        var inc = 0.02;
        scene.on("tick", function() {
            if (x > 0)
                x -= inc;
            if (y > 0)
                y -= inc;
            earth.set({x:x, y:y});
        });
    });
}, 2000);

/* Prepare to place image in earth layer */
window.setTimeout(function() {
    scene.getNode("personNode", function(personNode) {
        personNode.destroy();
        var img = addImgToBody("img/face.jpg");
    });
    stopOrbit();
}, 4500);

// Add person to layer in earth model
/*scene.getNode("peopleLayer", function(peopleLayer) {
    scene.getNode("personNode", function(personNode) {
        scene.getNode("personScale", function(personScale) {
            personScale.set({x:-0.2, y:-0.2, z:0.2});
        });
        personNode.disconnect();
        peopleLayer.addNode(personNode);
    });
 });*/
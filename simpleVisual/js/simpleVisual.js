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
            type:"cameras/orbit",
            id:"camera",
            zoom:10,
            zoomSensitivity:1,
            spin:0.1,

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

/* Position the person and earth model at center */

window.setTimeout(function() {
    scene.getNode("personScale", function(personScale) {
        // Add image to personNode
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

    scene.getNode("camera", function(camera) {
        // TODO: Stop earth from rotating and spin to desired angle
        //scene.off(camera._tick);
    });
}, 2000);

/* Place person in earth layer */

window.setTimeout(function() {
    scene.getNode("peopleLayer", function(peopleLayer) {
        scene.getNode("personNode", function(personNode) {
            scene.getNode("personScale", function(personScale) {
                personScale.set({x:-0.2, y:-0.2, z:0.2});
            });
            personNode.disconnect();
            peopleLayer.addNode(personNode);
            /*var x;
            scene.on("tick", function() {
                if (x < 0)
                    x += 0.02;
                personNode.setX(x);
            });*/
        });
    });
}, 4000);
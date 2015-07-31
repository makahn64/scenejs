SceneJS.setConfigs({
    pluginPath:"./plugins"
});

// TODO: scale to window size by altering canvas

var scene = SceneJS.createScene({
    nodes:[{
        type: "cameras/earthPickFly",
        id: "myCamera",
        showCursor:true,
        cursorSize:0.1,
        zoom:-10,

        nodes:[{
            type: "lights",
            id: "myLights",
            lights: [{
                mode: "ambient",
                color: {r: 1.0, g: 1.0, b: 1.0}
            }],

            nodes: [{
                type: "translate",
                x: 2, y: 1,
                id:"earth",

                nodes: [{
                    type: "models/space/planets/cartoonearth",
                }]
            }, {
                type: "translate",
                id: "personNode",
                x: -5, y:0, z:0,
            }]
        }]
    }]
});


window.setTimeout(function() {
    scene.getNode("personNode", function(personNode) {
        personNode.addNode({
            type: "texture",
            src: "img/face.jpg",
            nodes: [{
                type: "geometry/plane",
                width: 1, height: 1
            }]
        });
        var x = -5, y = 0, z = 0;
        var inc = 0.05;
        scene.on("tick", function() {
            if (x < 2) {
                x += inc+0.03;
            }
            if (y < 1) {
                y += 0.02;
            }
            if (z < 2.03) {
                z += inc;
            }
            personNode.set({x:x, y:y, z:z});
        });
    });
}, 2000);


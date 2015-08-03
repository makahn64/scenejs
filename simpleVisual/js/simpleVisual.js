SceneJS.setConfigs({
    pluginPath:"./plugins"
});

var earthStartX = 2, earthStartY = 1;

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
                x: earthStartX, y: earthStartY,
                id: "earth",

                nodes: [{
                    type:"models/space/planets/cartoonearth",
                    id:"earthModel",
                    rotate:true
                }]
            }]
        }]
    }]
});

startOrbit();

// Center the image and globe 
window.setTimeout(function() {
    addImgToBody("img/face.jpg");
    placeImg("-600px", "-150px", "0");
    addText("Bob", "San Jose, CA");
    setImgDelay("1s");
    moveImg("-50%", "-50%", "0");
    //rmText();

    scene.getNode("earth", function(earth) {
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

// Prepare to place image in earth layer 
window.setTimeout(function() {
    stopOrbit();
    zoomIn(addImgToEarth);
}, 4500);
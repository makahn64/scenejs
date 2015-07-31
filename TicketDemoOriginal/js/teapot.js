/**
 * Created by mkahn on 7/4/15.
 */

SceneJS.setConfigs({
    pluginPath: "./plugins"
});

var scene = SceneJS.createScene({
    nodes:[
        {
            type:"material",
            color: { r: 0.89, g: 0.3, b: 0.0 },

            nodes:[
                {
                    type: "rotate",
                    id: "myRotate",
                    y: 1.0, angle: 30,

                    nodes: [

                        // Teapot primitive, implemented by plugin file
                        // ./plugins/node/geometry/teapot.js
                        {
                            type:"geometry/teapot",
                            id: "myTeapot"
                        }
                    ]
                }
            ]
        }
    ]
});

scene.getNode("myRotate", function(myRotate) {

    var angle = 0;

    scene.on("tick",
        function() {
            myRotate.setAngle(angle += 5.5);
        });
});

scene.getNode("myTeapot", function(myTeapot) {

    //myTeapot.destroy();

    scene.getNode("myRotate", function(myRotate) {
        myRotate.addNode({
            type: "geometry/torus"
        });
    })
});
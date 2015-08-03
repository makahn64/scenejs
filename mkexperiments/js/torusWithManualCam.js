/**
 * Created by mkahn on 8/1/15.
 */

SceneJS.setConfigs({
    pluginPath: "plugins",
    // Disable the default status popups
    statusPopups: false
});


var torusAndSphere = [
    {
        type: "material",
        color: {r: 0.9, g: 0.6, b: 0.9},
        nodes: [

            // Torus primitive,
            // implemented by plugin at ../api/latest/plugins/node/geometry/torus.js
            {
                type: "geometry/torus",
                radius: 2.0,
                tube: 0.80, //Fatness of tire
                segmentsR: 60, //Tube smoothness
                segmentsT: 100, //Rim of the wheel
                arc: Math.PI * 2
            }
        ]
    },
    {
        type: "material",
        color: {r: 0.0, g: 0.6, b: 0.9},
        nodes: [

            // Torus primitive,
            // implemented by plugin at ../api/latest/plugins/node/geometry/torus.js
            {
                type: "geometry/sphere",
                radius: 0.5,
                latitiudeBands: 300,
                longitudeBands: 300
                }
        ]
    }
];


var scene = SceneJS.createScene({
    nodes: [

        // Mouse-orbited camera,
        // implemented by plugin at ../api/latest/plugins/node/cameras/orbit.js
        {
            type: "lookAt",
            eye: {y: 1, z: 10},
            id: "lookAt",
            look: {x: 1, y: 0, z: 0},
            nodes: torusAndSphere
        }
    ]
});

scene.getNode("lookAt", function (lookAt) {

    var direction = -1;


    scene.on("tick",
             function () {


                 var zed = lookAt.getEye();
                 zed.z = direction * 0.015 + zed.z;

                 if (zed.z > 10) {
                     direction = -1;
                 }
                 else if (zed.z < -10) {
                     direction = 1;
                 }

                 //console.log("Z " + zed.z);
                 lookAt.setEye(zed);

             });
});
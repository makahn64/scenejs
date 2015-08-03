/**
 * Created by mkahn on 8/1/15.
 */

SceneJS.setConfigs({
    pluginPath: "plugins"
});


var torus = [
                {
                    type: "material",
                    color: {r: 0.9, g: 0.6, b: 0.9},
                    nodes: [

                        // Torus primitive,
                        // implemented by plugin at ../api/latest/plugins/node/geometry/torus.js
                        {
                            type: "geometry/torus",
                            radius: 1.0,
                            tube: 0.30,
                            segmentsR: 60,
                            segmentsT: 40,
                            arc: Math.PI * 2
                        }
                    ]
                }
            ];


var scene = SceneJS.createScene({
    nodes: [

        // Mouse-orbited camera,
        // implemented by plugin at ../api/latest/plugins/node/cameras/orbit.js
        {
            type: "cameras/orbit",
            yaw: 30,
            pitch: -30,
            zoom: 5,
            zoomSensitivity: 2.0,
            nodes: torus
        }
    ]
});


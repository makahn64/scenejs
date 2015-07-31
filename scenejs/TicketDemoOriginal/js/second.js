/**
 * Created by mkahn on 7/4/15.
 */


SceneJS.setConfigs({
    pluginPath: "./plugins"
});

    // Point SceneJS to the bundled plugins
    SceneJS.setConfigs({
        pluginPath: "./plugins"
    });

    // Create scene
    SceneJS.createScene({
        nodes: [

            // Orbiting camera node, implemented by plugin at
            // http://scenejs.org/api/latest/plugins/node/cameras/orbit.js
            {
                type: "cameras/orbit",
                yaw: 30,
                pitch: -30,
                zoom: 5,
                zoomSensitivity: 1.0,

                nodes: [

                    // The color map
                    {
                        type: "texture",
                        src: "img/clue.png",
                        applyTo: "color",  // Apply to material "color" property (default)

                        nodes: [

                            // Box primitive implemented by plugin at
                            // http://scenejs.org/api/latest/plugins/node/geometry/box.js
                            {
                                type: "geometry/box"
                            }
                        ]
                    }
                ]
            }
        ]
    });


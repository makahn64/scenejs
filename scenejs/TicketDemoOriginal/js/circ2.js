/**
 * Created by mkahn on 7/4/15.
 */

var movingNodes = [];

function getRandomCoord() {

    return {

        x: -3 + (3 * Math.random()),
        y: -3 * (3 * Math.random()),
        z: -1.5 * (1.5 * Math.random())

    }

}

function getRandomColor() {

    var cNum = Math.round(5 * Math.random()) + 1;
    switch (cNum) {
        case 0:
            return {r: 1.0, g: 0.0, b: 0.0};
            break;

        case 1:
            return {r: 0.0, g: 1.0, b: 0.0};
            break;

        case 2:
            return {r: 0.0, g: 0.0, b: 1.0};
            break;

        case 3:
            return {r: 1.0, g: 1.0, b: 0.0};
            break;

        default:
            return {r: 1.0, g: 0.5, b: 0.2};


    }

}

function getRandomCircle(name) {

    var coord = getRandomCoord();

    var circle = {
        type: "translate",
        id: name,
        x: coord.x,
        y: coord.y,
        z: coord.z,
        nodes: [
            {

                type: "material",
                color: getRandomColor(),
                specularColor: {r: 1.0, g: 1.0, b: 1.0},
                specular: 1.0,
                shine: 70.0,
                emit: 1.0,
                alpha: 1.0,
                nodes: [
                    {
                        type: "geometry/circle"
                    }
                ]
            }

        ]

    }


}


SceneJS.setConfigs({
                       pluginPath: "./plugins"
                   });

// Create scene
var scene = SceneJS.createScene({
                                    nodes: [

                                        // Orbiting camera node, implemented by plugin at
                                        // http://scenejs.org/api/latest/plugins/node/cameras/orbit.js
                                        {
                                            type: "cameras/orbit",
                                            yaw: 0,
                                            pitch: 0,
                                            zoom: 10,
                                            zoomSensitivity: 1.0,


                                            nodes: [

                                                {
                                                    type: "lights",
                                                    lights: [

                                                        {
                                                            mode: "point",
                                                            color: {r: 1.0, g: 1.0, b: 1.0},
                                                            diffuse: true,
                                                            specular: false,
                                                            pos: {x: 0.0, y: 0.0, z: -100.0},
                                                            constantAttenuation: 0.1, // [0..1]
                                                            linearAttenuation: 0, // [0..1]
                                                            quadraticAttenuation: 0, // [0..1]
                                                            space: "world"
                                                        }
                                                    ],
                                                    nodes: [

                                                        {
                                                            type: "postprocess/dof",
                                                            id: "myDOF",
                                                            texelSize: 0.00022, // Size of one texel (1 / width, 1 / height)
                                                            blurCoeff: 0.084,	// Calculated from the blur equation, b = ( f * ms / N )
                                                            focusDist: 10.0,	// The distance to the subject in perfect focus (= Ds)
                                                            ppm: 10000,         // Pixels per millimetre
                                                            near: 10000,
                                                            far: 10000.0,
                                                            autofocus: false, // Set true (d
                                                            nodes: [
                                                                {
                                                                    type: "translate",
                                                                    id: name,
                                                                    x: 0,
                                                                    y: 0,
                                                                    z: 0,
                                                                    nodes: [
                                                                        {

                                                                            type: "material",
                                                                            color: getRandomColor(),
                                                                            specularColor: {r: 1.0, g: 1.0, b: 1.0},
                                                                            specular: 1.0,
                                                                            shine: 70.0,
                                                                            emit: 1.0,
                                                                            alpha: 1.0,
                                                                            nodes: [
                                                                                {
                                                                                    type: "geometry/circle"
                                                                                }
                                                                            ]
                                                                        }

                                                                    ]

                                                                }

                                                            ]

                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
    )
    ;


function move(node) {


    var y = 3;
    var yInc = -0.01;
    var z = 2;
    var zInc = 0.01;

    scene.on("tick",
             function () {
                 if (y >= 3.0) {
                     yInc *= -1;
                 } else if (y < -3.0) {
                     yInc *= -1;
                 }
                 y += yInc;


                 if (z >= 2) {
                     zInc *= -1;
                 } else if (z < -2) {
                     zInc *= -1;
                 }

                 z += zInc;

                 console.log("y: " + y + " z: " + z);
                 node.set({y: y, z: z});
             });

}

var rootNode = scene.getNode("myDOF");

for (var i = 0; i < 100; i++) {

    var newNode = getRandomCircle('Circle_' + i);
    rootNode.addNode(newNode);
    move(newNode);

}

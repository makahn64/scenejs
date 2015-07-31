/**
 * Created by mkahn on 7/4/15.
 */

var movingNodes = [];

function getRandomCoord() {

    return {

        x: -20 + (40 * Math.random()),
        y: -20 + (40 * Math.random()),
        z: 0 //-4 + Math.floor((8 * Math.random()))

    }

}

function getRandomColor() {


    return {r: Math.random(), g: Math.random(), b: Math.random()};

    var cNum = Math.floor(5 * Math.random());
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
                type: "flags",
                flags: {transparent: true},
                nodes: [
                    {

                        type: "material",
                        color: getRandomColor(),
                        specularColor: {r: 1.0, g: 1.0, b: 1.0},
                        specular: 0.5,
                        shine: 0.0,
                        emit: 0.2,
                        alpha: 0.5,
                        nodes: [
                            {
                                type: "geometry/sphere",
                                radius: 3 * Math.random()
                            }
                        ]
                    }

                ]
            }

        ]

    }

    return circle;


}

function getRedCircle(name) {

    var coord = getRandomCoord();

    var circle = {
        type: "translate",
        id: name,
        x: coord.x,
        y: coord.y,
        z: coord.z,
        nodes: [

            {
                type: "flags",
                flags: {transparent: true},
                nodes: [
                    {

                        type: "material",
                        color: { r: 1.0, g:0, b:0 },
                        specularColor: {r: 1.0, g: 1.0, b: 1.0},
                        specular: 0.5,
                        shine: 0.0,
                        emit: 0.2,
                        alpha: 0.5,
                        nodes: [
                            {
                                type: "geometry/sphere",
                                radius: 3 * Math.random()
                            }
                        ]
                    }

                ]
            }

        ]

    }

    return circle;


}


SceneJS.setConfigs({
                       pluginPath: "./plugins"
                   });

var coord = getRandomCoord();

// Create scene
var scene = SceneJS.createScene({
                                    nodes: [

                                        // Orbiting camera node, implemented by plugin at
                                        // http://scenejs.org/api/latest/plugins/node/cameras/orbit.js
                                        {
                                            type: "cameras/orbit",
                                            yaw: 0,
                                            pitch: 0,
                                            zoom: 50,
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
                                                            pos: {x: 0.0, y: 100.0, z: 100.0},
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
                                                            blurCoeff: 0.0084,
                                                            focusDist: 10.0,	// The distance to the subject in perfect focus (= Ds)
                                                            ppm: 1000,         // Pixels per millimetre
                                                            near: 5,
                                                            far: 70,
                                                            autofocus: false, // Set true (d
                                                            nodes: [
                                                                // We can't use #addNode to add nodes to a "cameras/orbit" node,
                                                                // so we'll insert this container node that we can get by ID
                                                                {
                                                                    id: "content"
                                                                }

                                                            ]

                                                        },
                                                        {
                                                            //These spheres will not be blurred. A cheat since the DOF filter doesn't seem to provide
                                                            //and easy way to set the depth.
                                                            id: "clear"
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

    var yInc = 0.01;
    var zInc = 0.001;


    var y = node.getY() + yInc * node.model.ydirection;
    var z = node.getZ() + zInc * node.model.zdirection;

    if ((y > 40) || (y < -40)) {
        node.model.ydirection *= -1;
    }

    if ((z > 4) || (z < -4)) {
        node.model.zdirection *= -1;
    }

    //console.log("Node z: " + z);

    node.set({y: y, z: z});

}


scene.getNode("content", function (n) {

    /*
     n.addNode(
     {
     type: "translate",
     id: 'myCirc',
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
     );
     */

    for (var i = 0; i < 2; i++) {

        var newNode = getRandomCircle('Circle_' + i);
        n.addNode(newNode);
        console.log("Added node: " + i);
        scene.getNode('Circle_' + i, function (n) {
            var rz = 0.5 - Math.random();
            var ry = 0.5 - Math.random();

            n['model'] = {
                zdirection: rz,
                ydirection: ry * 4
            };
            movingNodes.push(n);
        });

    }


    //TODO: Left off here. Could not seem to get blur layer and clear layer working together.
    scene.getNode("clear", function (n) {


        for (var i = 0; i < 50; i++) {

            var newNode = getRedCircle('ClearCircle_' + i);

            n.addNode(newNode);
            console.log("Added clear node: " + i);
            scene.getNode('ClearCircle_' + i, function (nn) {
                var rz = 0.5 - Math.random();
                var ry = 0.5 - Math.random();

                nn['model'] = {
                    zdirection: rz,
                    ydirection: ry * 4
                };
                movingNodes.push(nn);
            });

        }

        scene.on("tick", function (p) {
        console.log("Tick!");
        for (var i = 0; i < movingNodes.length; i++) {

            move(movingNodes[i]);
            /*
             scene.getNode('Circle_' + i, function (n) {
             move(n);
             });
             */
        }

    });



    });


});


/*

 */


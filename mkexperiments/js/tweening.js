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

//Set up the "tween"

var eye = {x: 0, y: 1, z: 10};
var eyeTarget = {x: 0, y: 10, z: -10};

//Change the 'to' param to this to get array tweening
var eyeTargets = {
    x: [0, 0, 0, 0],
    y: [0, 1, 10, 0],
    z: [5, 10, -10, 5]
};

var tween = new TWEEN.Tween(eye).to(eyeTarget, 10000);

//Uncomment the lines individually below and see what happens
//See: https://github.com/tweenjs/tween.js/blob/master/examples/03_graphs.html
//tween.easing(TWEEN.Easing.Elastic.InOut)
//tween.easing(TWEEN.Easing.Bounce.InOut);

//tween.repeat(10);
//tween.yoyo(true);

var tweenB = new TWEEN.Tween(eye).to({y: -10}, 10000);
tween.chain(tweenB);


scene.getNode("lookAt", function (lookAt) {

    function up() {
        lookAt.setEye(eye);
    }

    tween.onUpdate(up);

    tweenB.onUpdate(up);

    tween.start();


    scene.on("tick",
             function () {

                 //CAPITALIZED because it is calling the Tween engine's "class method".
                 TWEEN.update();

             });
});
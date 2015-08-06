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
        color: {r: 0.6, g: 0.6, b: 0.6},
        nodes: [
            {
                type: "texture",
                src: "textures/tire.jpg",
                applyTo: "color",  // Apply to material "color" property (default)
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
            }]
    },

    {
        type: "material",
        color: {r: 1.0, g: 1.0, b: 1.0},
        nodes: [

            // Sphere primative with a texture
            {
                type: "texture",
                src: "textures/earth2.jpg",
                applyTo: "color",  // Apply to material "color" property (default)
                nodes: [
                    {
                        type: "geometry/sphere",
                        radius: 0.5,
                        latitiudeBands: 300,
                        longitudeBands: 300
                    }
                ]
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

//Change the 'to' param to this to try array tweening
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

//Comment out the repeat and yoyo above and uncomment the below to try chained tweening

var tweenB = new TWEEN.Tween(eye).to({y: -10}, 10000);
tween.chain(tweenB);


scene.getNode("lookAt", function (lookAt) {

    function up() {
        lookAt.setEye(eye);
    }

    tween.onUpdate(up);

    //Uncomment if doing chaining
    tweenB.onUpdate(up);

    tween.start();


    scene.on("tick",
             function () {

                 //CAPITALIZED because it is calling the Tween engine's "class method".
                 TWEEN.update();

             });
});
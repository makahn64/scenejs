/**
 * Planet earth model
 *
 * @author xeolabs / http://xeolabs.com
 *
 * <p>Usage example:</p>
 *
 * <pre>
 * someNode.addNode({
 *      type: "models/space/planets/earth"
 *  });
 * </pre>
 */
SceneJS.Types.addType("models/space/planets/earth2", {

    construct: function (params) {

        var texturePath = SceneJS.getConfigs("pluginPath") + "/node/models/space/planets/earth2/";

        var node = this.addNode({
            type: "rotate",
            z: 1,
            angle: 195
        });

        var earthRotate = node = node.addNode({
            type: "rotate",
            y: 1
        });

        // Layer 0: Earth's surface with color, specular
        // and emissive maps

        node = node.addNode({
            type: "layer",
            priority: 0,

            nodes: [
                {
                    type: "scale",
                    x: 2,
                    y: 1.9,
                    z: 2,

                    nodes: [
                        {
                            type: "material",
                            emit: 0.5,
                            color: {r: 1.0, g: 1.0, b: 1.0},
                            //specularColor: {r: 1.0, g: 1.0, b: 1.0},
                            //specular: 1.0,
                            //shine: 90.0,

                            nodes: [

                                // Color map
                                {
                                    type: "texture",
                                    coreId: this.type + ".color",
                                    src: texturePath + "earth2bw.jpg",
                                    preloadSrc: texturePath + "earthDiffusePreload.jpg",
                                    applyTo: "color",

                                    nodes: [


                                        // Sphere geometry
                                        {
                                            type: "geometry/sphere",
                                            latitudeBands: 1200,
                                            longitudeBands: 1200
                                        }

                                    ]
                                },
                                {
                                    type: "material",
                                    color: {r: 0, g: 1, b: 0},
                                    nodes: [
                                        {
                                            type: "geometry/box",
                                            size: [0.5, 0.5, 1.10]
                                        }]

                                }
                            ]
                        }
                    ]
                }
            ]
        });

// Layer 1: Cloud layer with alpha map
        /*
         var cloudsRotate = node = node.addNode({
         type: "rotate",
         y: 1,
         nodes: [
         {
         type: "layer",
         priority: 1,
         nodes: [
         {
         type: "flags",
         flags: {
         transparent: true,
         specular: true
         },
         nodes: [
         {
         type: "material",
         emit: 0.1,
         alpha: 0.7,
         color: {r: 1, g: 1, b: 1},
         specularColor: {r: 1.0, g: 1.0, b: 1.0},
         specular: 0.5,
         shine: 1.0,
         nodes: [
         {
         type: "scale",
         x: 2.02,
         y: 2.02,
         z: 2.02,

         nodes: [
         {
         type: "texture",
         coreId: this.type + ".alpha",
         src: texturePath + "earthAlpha.jpg",
         preloadSrc: texturePath + "earthAlphaPreload.jpg",
         applyTo: "alpha",
         flipY: false,

         // Sphere with some material
         nodes: [
         {
         type: "node",
         z: 1,
         angle: 195,

         nodes: [
         {
         type: "geometry/sphere",
         latitudeBands: 120,
         longitudeBands: 120
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
         ]
         });
         */

        var earthAngle = 0;
        var cloudsAngle = 0;

        this._tick = this.getScene().on("tick",
                                        function () {
                                            earthRotate.setAngle(earthAngle);
                                            //cloudsRotate.setAngle(cloudsAngle);

                                            earthAngle -= 0.13;
                                            //cloudsAngle -= 0.006;
                                        });
    },

// Node destructor, unsubscribes from scene tick
    destruct: function () {
        this.getScene().off(this._tick);
    }
})
;

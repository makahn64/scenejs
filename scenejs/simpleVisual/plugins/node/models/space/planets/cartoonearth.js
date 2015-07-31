SceneJS.Types.addType("models/space/planets/cartoonearth", {
    construct: function(params) {
        var texturePath = SceneJS.getConfigs("pluginPath") + "/node/models/space/planets/cartoonearth/";

        // Tilts the earth
        var node = this.addNode({
            type:"rotate",
            z:1,
            angle:195
        });

        // Used to rotate the earth around its y-axis
        var earthRotate = node = node.addNode({
            type:"rotate",
            id:"earthRotate",
            y:1
        });

        // Layer 0: Earth's land with color
        node = node.addNode({
            type:"layer",
            priority:0,

            nodes:[{
                type:"scale",
                x:2, y:2, z:2,

                nodes:[{
                    type:"material",
                    color: {r:0, g:0.7, b:0.2},

                    nodes:[{
                        type: "geometry/sphere",
                        latitudeBands: 120,
                        longitudeBands: 120
                    }]
                }]
            }]
        });

        // Layer 1: Earth's oceans with color
        node = node.addNode({
            type:"layer",
            priority:1,

            nodes:[{
                type:"scale",
                x:2.01, y:2.01, z:2.01,

                nodes:[{
                    type:"flags",
                    flags:{transparent:true},

                    nodes:[{
                        type:"material",
                        color: {r:0, g:0.8, b:1.0},
                        alpha:1.0,

                        nodes:[{
                            type: "texture",
                            coreId: this.type + ".color",
                            src: texturePath + "earthBlackWhite.jpg",
                            applyTo: "alpha",
                            blendMode:"add",

                            nodes: [{
                                type: "geometry/sphere",
                                latitudeBands: 120,
                                longitudeBands: 120
                            }]
                        }]
                    }]
                }]
            }]
        });

        //Layer 2: People
        node = node.addNode({
            type:"layer",
            id:"peopleLayer",
            priority:2,

            nodes:[{
                type:"translate",
                z:2.03,

                nodes:[{
                    type: "material",
                    color: {r: 1.0, g: 0, b: 0},

                    nodes: [{
                        type: "geometry/plane",
                        width: 0.2, height: 0.2
                    }]
                }]
            }]
        });

        var earthAngle = 0;

        this._tick = this.getScene().on("tick", function() {
            earthRotate.setAngle(earthAngle);

            earthAngle -= 0.05;
        });
    },

    // Node deconstructor unsubscribes from scene tick
    destruct: function() {
        this.getScene().off(this._tick);
    }
});
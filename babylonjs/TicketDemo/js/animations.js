/** Creates an animation to move the ticket plane and executes it.
 * @param name {String} name of ticket mesh
 * @param maxY {Number}
 * @param minY {Number}
 * @param scene {BABYLON.Scene}
 */
function animateTicket(name, maxY, minY, scene) {
    var ticket = scene.getMeshByName(name);

    var animation = new BABYLON.Animation("moveTicket", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var initialY = ticket.position.y;

    // Create array with animation keys
    var keys = [];
    keys.push({frame: 0, value: initialY});
    keys.push({frame: 600, value: maxY});
    keys.push({frame: 1200, value: initialY});
    keys.push({frame: 1800, value: minY});
    keys.push({frame: 2400, value: initialY});
    animation.setKeys(keys);

    ticket.animations.push(animation);
    scene.beginAnimation(ticket, 0, 2400, true);
}
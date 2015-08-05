/**
 * Sets up canvas for our image texture.
 *
 */
function canvasSetUp(texture) {
    texture.getContext().rotate(Math.PI);
}

/**
 * Canvas code to draw an image onto a texture.
 *
 * @param src {String} image source
 * @param width {Number}
 * @param height {Number}
 * @param texture {BABYLON.DynamicTexture} texture to draw image onto
 */
function drawImg(src, posX, posY, texture) {
    var img = new Image();
    img.src = src;
    img.onload = function() {
        // Adjust width and height depending on positiion so img isn't warped
        texture.getContext().drawImage(img, posX, posY, 10, 10);
        texture.update(true);
    };
}
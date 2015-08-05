/**
 * Adds text as a DOM element to the page.
 * @param name {String}
 * @param location {String}
 */
function addText(name, location) {
    var body = document.getElementsByTagName("body")[0];
    var h = document.createElement("h1");

    var text1 = document.createTextNode("Hello " + name + "!");
    var text2 = document.createTextNode(location);

    h.appendChild(text1);
    h.appendChild(document.createElement("br"));
    h.appendChild(text2);

    var style = h.style;
    style.opacity = "0";
    style.position = "absolute";
    style.margin = "auto";
    // TODO: make position of text relative to image/earth
    style.top = "225px";
    style.left = "525px";
    style.transition = "opacity 1s ease";

    h.id = "myText";
    body.appendChild(h);

    getComputedStyle(h).display;
    style.opacity = "1";
}

/**
 * Removes the "myText" DOM element.
 */
function rmText() {
    var body = document.getElementsByTagName("body")[0];
    var text = document.getElementById("myText");

    getComputedStyle(text).display;
    text.style.opacity = "0";
    // TODO: remove text element from body after it has faded
    // body.removeChild(text);
}
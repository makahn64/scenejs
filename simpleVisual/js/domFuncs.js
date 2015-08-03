/**
 * DOM manipulation functions.
 */

function addText(name, location) {
    var body = document.getElementsByTagName("body")[0];
    var h = document.createElement("h1");
    var text1 = document.createTextNode("Hello " + name + "!")
    var text2 = document.createTextNode(location);
    h.appendChild(text1);
    h.appendChild(document.createElement("br"));
    h.appendChild(text2);

    var style = h.style;

    style.opacity = "0.0";
    style.position = "absolute";
    style.margin = "auto";
    style.top = "275px";
    style.left = "350px";
    style.transition = "opacity 1s ease";

    h.id = "myText";
    body.appendChild(h);

    getComputedStyle(h).display;
    style.opacity = "1";
}

function rmText() {
    var body = document.getElementsByTagName("body")[0];
    var text = document.getElementById("myText");

    getComputedStyle(text).display;
    text.style["transition-delay"] = "4s";
    text.style.opacity = "0";
    body.removeChild(text);
}

function addImgToBody(imgSrc) {
    var body = document.getElementsByTagName("body")[0];
    var img = document.createElement("img");
    var style = img.style;

    style.display = "none";
    style.position= "absolute";
    style.margin = "auto";
    style.top = "50%";
    style.left = "50%";
    style.width = "130px";
    style.height = "130px";
    style.opacity = "0";
    style.transform = "none";
    style.transition = "transform 2s ease, opacity 0.75s ease";

    img.src = imgSrc;
    img.id = "myImg";
    body.appendChild(img);
}

function rmImgFromBody(callback) {
    var body = document.getElementsByTagName("body")[0];
    var img = document.getElementById("myImg");
    body.removeChild(img);

    if(typeof callback === "function")
        callback(startOrbit);
}

// x, y, z are strings to verify values as px, %, etc.
function moveImg(x, y, z, delay) {
    var img = document.getElementById("myImg");
    getComputedStyle(img).display;
    img.style.transform = "translate3d(" + x + ", " + y + ", "
        + z + ")";
}

// x, y, z are strings to verify values as px, %, etc.
function placeImg(x, y, z) {
    var img = document.getElementById("myImg");
    img.style.display = "none";
    moveImg(x, y, z);
    img.style.display = "initial";
    getComputedStyle(img).display;
    img.style.opacity = "1";
}

// time is a string
function setImgDelay(time) {
    var img = document.getElementById("myImg");
    getComputedStyle(img).display;
    img.style["transition-delay"] = time;
}


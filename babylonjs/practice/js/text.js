/**
 * Adds text as a DOM element to the page.
 * @param name {String}
 * @param location {String}
 */
function addText(name, location) {
    var myText = document.getElementById("myText");

    if(myText === null) {
        var body = document.getElementsByTagName("body")[0];
        var myText = document.createElement("h1");

        var style = myText.style;
        style.opacity = "0";
        style.position = "absolute";
        style.margin = "auto";
        style["font-size"] = "70px";
        style["font-weight"] = "300";
        style.top = "30%";
        style.left = "31%";
        style.transition = "opacity 1s ease";
        myText.id = "myText";

        body.appendChild(myText);
    }

    else {
        while(myText.firstChild)
            myText.removeChild(myText.firstChild);
    }

    var text1 = document.createTextNode("Hello " + name + "!");
    var text2 = document.createTextNode(location);

    myText.appendChild(text1);
    myText.appendChild(document.createElement("br"));
    myText.appendChild(text2);

    getComputedStyle(myText).display;
    myText.style.opacity = "1";
}

/**
 * Removes the "myText" DOM element.
 */
function rmText() {
    var body = document.getElementsByTagName("body")[0];
    var text = document.getElementById("myText");
    getComputedStyle(text).display;
    text.style.opacity = "0";
}
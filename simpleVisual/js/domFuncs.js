var addImgToBody = (function (imgSrc) {
    var body = document.getElementsByTagName("body")[0];
    var img = document.createElement("img");

    var style = img.style;
    style.position= "absolute";
    style.margin = "auto";
    style.left = "0";
    style.right = "0";
    style.top = "0";
    style.bottom = "0";
    style.width = "130px";
    style.height = "130px";
    //style.transition = "left 2s";
    //style.transition = "top 2s";

    img.src = imgSrc;
    body.appendChild(img);

    return {
        setPos: function(pos) {
            style.left = "" + pos.x + "px";
            style.top = "" + pos.y + "px";
        }
    }
});


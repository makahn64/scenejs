function runPlaylist(playlist) {
    // Process playlist
    function processPlaylist(item) {
        console.log("Here " + item);
        var curItem = item;

        if (curItem >= playlist.length) {
            console.log("Done with playlist");
            return;
        }
        if (playlist[curItem].type == "video") {
            displayVid(playlist[curItem].src, "video/mp4", processPlaylist, ++item);
        }
        if (playlist[curItem].type == "image") {
            displayImg(playlist[curItem].src, playlist[item].duration, processPlaylist, ++item);
        }
        if (playlist[curItem].type == "viz") {
            displayViz(playlist[curItem].src, processPlaylist, ++item);
        }
    }

    processPlaylist(0);
}

function displayImg(imgSrc, duration, callback, idx) {
    var div = document.getElementById("myDiv");
    var img = new Image();

    img.src = window.location.href + imgSrc;
    img.style.width = "100%";
    img.style.height = "100%";

    img.onload = function() {
        div.appendChild(img);
        window.setTimeout(function() {
            div.removeChild(img);
            callback(idx);
        }, duration);
    };
}

function displayVid(vidSrc, vidType, callback, idx) {
    var div = document.getElementById("myDiv");
    var vid = document.createElement("video");
    var source = document.createElement("source");

    vid.id = "myVid";
    vid.autoplay = "autoplay";
    source.src = window.location.href + vidSrc;
    source.type = vidType;

    //vid.width =
    //vid.height =

    vid.appendChild(source);
    div.appendChild(vid);

    vid.onended = function() {
        div.removeChild(vid);
        callback(idx);
    };
}

// Assumes the viz source file contains a run scene function.
function displayViz(vizSrc, callback, idx) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = vizSrc;
    head.appendChild(script);

    script.onload = function() {
        runScene();
    };
}

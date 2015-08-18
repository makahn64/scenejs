var cycle = 0;
function runPlaylist(playlist) {
    // Process playlist
    function processPlaylist(item) {
        var curItem = item % 3;

        if(curItem == 0)
            console.log('cycle '+cycle++);

        if (curItem >= playlist.length) {
            console.log("Done with playlist");
            return;
        }
        if (playlist[curItem].type == "video") {
            displayVid(playlist[curItem].src, "video/mp4", processPlaylist, curItem + 1);
        }
        if (playlist[curItem].type == "image") {
            displayImg(playlist[curItem].src, playlist[curItem].duration, processPlaylist, curItem + 1);
        }
        if (playlist[curItem].type == "viz") {
            displayViz(playlist[curItem].src, playlist[curItem].duration, processPlaylist, curItem + 1);
        }
    }

    processPlaylist(0);
}

function findTransitionEvent() {
    var t;
    var elem = document.createElement("fake");
    var transitions = {
        'transition':'transitionend',
        'OTransition':'oTransitionEnd',
        'MozTransition':'transitionend',
        'WebkitTransition':'webkitTransitionEnd'
    };

    for(t in transitions) {
        if(elem.style[t] !== undefined) {
            return transitions[t];
        }
    }
}

function displayImg(imgSrc, duration, callback, idx) {
    var div = document.getElementById("mediaDiv");
    var img = new Image();

    img.src = window.location.href + imgSrc;
    img.style.opacity = "0";
    img.style.transition = "opacity 0.75s ease";

    var transitionEvent = findTransitionEvent();
    var curTransition = 0;
    img.addEventListener(transitionEvent, function() {
        if(curTransition == 1) {
            div.removeChild(img);
            callback(idx);
        }
        curTransition++;
    });

    img.onload = function() {
        div.appendChild(img);
        getComputedStyle(img).display;
        img.style.opacity = "1";

        window.setTimeout(function() {
            getComputedStyle(img).display;
            img.style.opacity = '0';
        }, duration);
    };
}

function displayVid(vidSrc, vidType, callback, idx) {
    var div = document.getElementById("mediaDiv");
    var vid = document.createElement("video");
    var source = document.createElement("source");

    vid.id = "myVid";
    vid.autoplay = "autoplay";
    vid.style.opacity = "0";
    vid.style.transition = "opacity 0.75s ease";

    source.src = window.location.href + vidSrc;
    source.type = vidType;

    vid.appendChild(source);
    div.appendChild(vid);

    var transitionEvent = findTransitionEvent();
    var curTransition = 0;
    vid.addEventListener(transitionEvent, function() {
        if(curTransition == 1) {
            div.removeChild(vid);
            callback(idx);
        }
        curTransition++;
    });

    getComputedStyle(vid).display;
    vid.style.opacity = '1';

    vid.onended = function() {
        getComputedStyle(vid).display;
        vid.style.opacity = '0';
    };
}

/*
 * Assumes the viz source file contains runScene and clearScene functions and that it loads
 * whatever other scripts it needs.
 */
var scripts = {};
function displayViz(vizSrc, duration, callback, idx) {
    if(!scripts[vizSrc]) {
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");

        script.type = "text/javascript";
        script.src = vizSrc;
        head.appendChild(script);

        scripts[vizSrc] = true;

        script.onload = function() {
            runScene();
            window.setTimeout(function() {
                clearScene();
                callback(idx);
            }, duration);
        };
    }
    else {
        runScene();
        window.setTimeout(function() {
            clearScene();
            callback(idx);
        }, duration);
    }

}
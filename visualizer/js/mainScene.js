function runPlaylist(playlist) {

    function processPlaylist(item) {
        var curItem = item % playlist.length;

        switch(playlist[curItem].type) {
            case "video":
                displayVid(playlist[curItem].src, "video/mp4", processPlaylist, curItem + 1);
                break;
            case "image":
                displayImg(playlist[curItem].src, playlist[curItem].duration, processPlaylist, curItem + 1);
                break;
            case "viz":
                displayViz(playlist[curItem].src, playlist[curItem].duration, processPlaylist, curItem + 1);
                break;
            default:
                break;
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

function purge(elem) {
    var a = elem.attributes;
    var i, l, n;

    if(a) {
        for(i = a.length - 1; i >= 0; i--) {
            n = a[i].name;
            if(typeof elem[n] === 'function') {
                elem[n] = null;
            }
        }
    }
    a = elem.childNodes;
    if (a) {
        l = a.length;
        for(i = 0; i < l; i++) {
            purge(elem.childNodes[i]);
        }
    }
}

function displayImg(imgSrc, duration, callback, idx) {
    var div = document.getElementById("mediaDiv");
    var img = new Image();

    img.src = window.location.href + imgSrc;
    img.style.opacity = "0";
    img.style.transition = "opacity 1s ease";

    var transitionEvent = findTransitionEvent();
    var curTransition = 0;
    img.addEventListener(transitionEvent, function() {
        if(curTransition == 1) {
            purge(img);
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
            purge(vid);
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
    angular.element(document.getElementById("renderCanvas")).scope().runVisual(vizSrc, duration, callback, idx);
}

function startScene(vizSrc, imgData, duration, callback, idx) {
    if(!scripts[vizSrc]) {
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");

        script.type = "text/javascript";
        script.src = vizSrc;
        head.appendChild(script);

        scripts[vizSrc] = true;

        script.onload = function() {
            runScene(imgData);
            window.setTimeout(function() {
                clearScene();
                callback(idx);
            }, duration);
        };
    }
    else {
        runScene(imgData);
        window.setTimeout(function() {
            callback(idx);
            clearScene();
        }, duration);
    }
}

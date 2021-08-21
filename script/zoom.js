var zoomFunc, visibleWidth, visibleHeight, scale;
$(document).ready(function(){
    var zoomIntensity = 0.2;
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var largerBtn = document.getElementById("largerBtn");
    var smallerBtn = document.getElementById("smallerBtn");
    if (largerBtn == null || smallerBtn == null) return;

    scale = 1;
    visibleWidth = width;
    visibleHeight = height;

    zoomFunc = function (wheel){
        zoom = Math.exp(wheel * zoomIntensity);
        context.scale(zoom, zoom);
        scale *= zoom;
        visibleWidth = width / scale;
        visibleHeight = height / scale;
        if (root != null) {
            canvas.getContext("2d").clearRect(0, 0, 1e6, 1e6);
            root.draw(context, new Range(0, visibleWidth), 40);
        }
    }

    largerBtn.onclick = function() {
        zoomFunc(1);
    }
    smallerBtn.onclick = function() {
        zoomFunc(-1);
    }
});
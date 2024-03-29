var $inp, $btn, $sizeInp, root, scale, zoomFunc, shouldZoomOut;
$(document).ready(function(){
    $inp = $("#input");
    $btn = $("#randomBtn");
    $sizeInp = $("#size");

    $inp.val("1,2,3");
    $sizeInp.val("3");

    $inp[0].addEventListener('input', callDraw);

    draw();
});

function setup() {
    draw();
}

function callDraw() {
    scaleBefore = scale;
    scale = 1;
    draw();
    if (scaleBefore > scale) {
        while (scaleBefore > scale) {
            zoomFunc(1);
        }
    }
    else if (scaleBefore < scale) {
        while (scaleBefore < scale) {
            zoomFunc(-1);
        }   
    }
    if (shouldZoomOut) {
        zoomFunc(-1);
    }
}

function draw() {
    var canvas = document.getElementById("canvas");

    var ctx = canvas.getContext("2d");

    let nums = $("#input").val().split(",");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (nums.length > 0) {
        bst = new BST();

        for (let i = 0; i < nums.length; i++) {
            let val = parseInt(nums[i]);
            if (!isNaN(val))
                bst.insert(parseInt(nums[i]));
        }

        ctx.canvas.width = $(window).width();

        root = bst.root;

        if (bst.root != null) {
            bst.root.draw(ctx, new Range(0, canvas.width), 40);
        }

    }

}

function rand(size, $inp, $btn) {
    if (size == 1) {
        $inp.val($inp.val() + Math.floor(Math.random() * 100));
        callDraw();
        $btn.removeAttr("disabled");
        $inp.removeAttr("disabled");
        $sizeInp.removeAttr("disabled");
    }
    else if (size > 1) {
        $inp.val($inp.val() + Math.floor(Math.random() * 100) + ",");
        callDraw();
        setTimeout(function() {rand(size-1, $inp, $btn)}, 800);
    }
}

function randomBST() {
    $inp.attr("disabled", true);
    $btn.attr("disabled", true);
    $sizeInp.attr("disabled", true);
    $inp.val("");
    rand($sizeInp.val(), $inp, $btn);
}
$(document).ready(function(){
    $("#input").val("1,2,3");

    var input = $("#input")[0];

    input.addEventListener('input', draw);
});

function setup() {
    draw();
}

function draw() {
    var canvas = document.getElementById("canvas");

    var ctx = canvas.getContext("2d");

    let nums = $("#input").val().split(",");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (nums.length > 0) {
        let bst = new BST();

        for (let i = 0; i < nums.length; i++) {
            let val = parseInt(nums[i]);
            if (!isNaN(val))
                bst.insert(parseInt(nums[i]));
        }

        ctx.canvas.width = $(window).width();

        if (bst.root != null)
            bst.root.draw(ctx, new Range(0, canvas.width), 40);
    }
}

function rand(size, $inp, $btn) {
    if (size === 1) {
        $inp.val($inp.val() + Math.floor(Math.random() * 100));
        $btn.removeAttr("disabled");
        $inp.removeAttr("disabled");
    }
    else if (size > 1) {
        $inp.val($inp.val() + Math.floor(Math.random() * 100) + ",");
        setTimeout(function() {rand(size-1, $inp, $btn)}, 800);
    }
    draw();
}

function randomBST() {
    $inp = $("#input");
    $btn = $("#randomBtn");
    $inp.attr("disabled", true);
    $btn.attr("disabled", true);
    $inp.val("");
    rand(7, $inp, $btn);
}
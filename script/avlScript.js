var $inp, $btn, $sizeInp, root, $largerBtn, $smallerBtn;
$(document).ready(function(){
    $inp = $("#input");
    $btn = $("#randomBtn");
    $sizeInp = $("#size");
    $largerBtn = $("#largerBtn");
    $smallerBtn = $("#smallerBtn");

    $inp.val("1,2,3");
    $sizeInp.val("3");

    $inp[0].addEventListener('input', draw);

    draw();
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
        let tree = new AVL();

        for (let i = 0; i < nums.length; i++) {
            let val = parseInt(nums[i]);
            if (!isNaN(val))
                tree.insert(parseInt(nums[i]));
        }

        ctx.canvas.width = $(window).width();

        root = tree.root;

        if (tree.root != null)
            tree.root.draw(ctx, new Range(0, canvas.width), 40);
    }
}

function rand(size, $inp, $btn) {
    if (size == 1) {
        $inp.val($inp.val() + Math.floor(Math.random() * 100));
        draw();
        $btn.removeAttr("disabled");
        $inp.removeAttr("disabled");
        $sizeInp.removeAttr("disabled");
        if ($largerBtn[0] != undefined) {
            $largerBtn.removeAttr("disabled");
            $smallerBtn.removeAttr("disabled");
        }

    }
    else if (size > 1) {
        $inp.val($inp.val() + Math.floor(Math.random() * 100) + ",");
        draw();
        setTimeout(function() {rand(size-1, $inp, $btn)}, 800);
    }
    
}

function randomAVL() {
    $inp.attr("disabled", true);
    $btn.attr("disabled", true);
    $sizeInp.attr("disabled", true);
    if ($largerBtn[0] != undefined) {
        $largerBtn.attr("disabled", true);
        $smallerBtn.attr("disabled", true);
    }
    $inp.val("");
    rand($sizeInp.val(), $inp, $btn);
}
$(document).ready(function(){
    $("#input").val("1,2,3");
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

    setTimeout(function () {
        draw();
    }, 50);
}

function rand(size) {
    let inputObj = $("#input");

    if (size === 1) {
        inputObj.val(inputObj.val() + Math.floor(Math.random() * 100));
    }
    else if (size > 1) {
        inputObj.val(inputObj.val() + Math.floor(Math.random() * 100) + ",");
        setTimeout(function() {rand(size-1)}, 800);
    }
}

function randomBST() {
    $("#input").val("");
    rand(7);
}
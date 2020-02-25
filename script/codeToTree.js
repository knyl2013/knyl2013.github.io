var editor;
var root;

$(document).ready(function(){
    var code = $(".codemirror-textarea")[0];
    editor = CodeMirror.fromTextArea(code, {
        lineNumbers : true,
        mode: "javascript",
        theme: "3024-night"
    });

    editor.setValue("/*\n" +
        "    class TreeNode {\n" +
        "        constructor(data) {\n" +
        "            this.left = null;\n" +
        "            this.right = null;\n" +
        "            this.data = data;\n" +
        "        }\n" +
        "    }\n" +
        "*/\n" +
        "\n" +
        "function drawTree() {\n" +
        "\troot = new TreeNode(0);\n" +
        "  \troot.left = new TreeNode(1);\n" +
        "  \troot.right = new TreeNode(2);\n" +
        "  \treturn root;\n" +
        "}");

});

function setup() {
    draw();
}

function updateRoot() {
    if (editor != null) {
        var theInstructions = editor.getValue();
        var code = editor.getValue() + "; root = drawTree()";
        try {
            eval(code);
        } catch(err) {
            //console.log(err);
        }
    }
}

function draw() {
    updateRoot();

    if (root != null) {
        var canvas = document.getElementById("canvas");

        var ctx = canvas.getContext("2d");

        ctx.canvas.width = $(window).width();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        root.draw(ctx, new Range(0, canvas.width), 40);
    }

    setTimeout(function () {
        draw();
    }, 50);
}


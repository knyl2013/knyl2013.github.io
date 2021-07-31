$(document).ready(function(){
	var str = `"nodes": [
{"id": "1", "left": "2", "right": "3", "value": 1},
{"id": "2", "left": null, "right": null, "value": 2},
{"id": "3", "left": null, "right": null, "value": 3}
],
"root": "1"`;
    $("#input").val(str);
    var input = $("#input")[0];
    input.addEventListener('input', draw);
    draw();
});


function getTreeFromString(str) {
	var obj = JSON.parse("{" + str.replaceAll("\n","").replaceAll("\t","").replaceAll(" ","") + "}");
	var n = obj.nodes.length;
	var dict = {};
	var root = null;
	for (var i = 0; i < n; i++) {
		var cur = obj.nodes[i];
		dict[cur.id] = new TreeNode(cur.value);
	}
	for (var i = 0; i < n; i++) {
		var cur = obj.nodes[i];
		var node = dict[cur.id];
		node.left = cur.left == null ? null : dict[cur.left];
		node.right = cur.right == null ? null : dict[cur.right];
		if (cur.id == obj.root) {
			root = node;
		}
	}
	return root;
}

function setup() {
    draw();
}

function draw() {
    var canvas = document.getElementById("canvas");

    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.canvas.width = $(window).width();

    root = getTreeFromString($("#input").val());

    root.draw(ctx, new Range(0, canvas.width), 40);
}
var scale, zoomFunc;
$(document).ready(function(){
    $('#canvas').width = $('window').width();

    openCode(null, "Javascript");

    $("#jsBtn").addClass("active");

    $("#input").val("1,2,3,null,4");

    $("#input").focus();

    var input = $("#input")[0];

    input.addEventListener('input', callDraw);

    draw();
});

function parseInputToJavascript() {
    $("#jsLabels").text($("#input").val());
}

function parseInputToPython() {
    let inputStr = $("#input").val();
    $("#pythonLabels").text(inputStr.replace(/null/g, 'None'));
}

function openCode(evt, lang) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(lang).style.display = "block";
    if (evt != null)
        evt.currentTarget.className += " active";
}

function getTreeFromString(str) {
    let labels = str.replace("[","").replace("]","").split(",");
    let nodes = [];

    for (let i = 0; i < labels.length; i++) {
        if (labels[i] === "null")
            nodes.push(null);
        else
            nodes.push(new TreeNode(labels[i]));
    }

    let children = nodes.slice().reverse();

    let res = children.pop();

    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] != null) {
            if (nodes.length > 0)
                nodes[i].left = children.pop();
            if (nodes.length > 0)
                nodes[i].right = children.pop();
        }
    }

    return res;
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

    parseInputToPython();

    parseInputToJavascript();

    root.draw(ctx, new Range(0, canvas.width), 40);
}
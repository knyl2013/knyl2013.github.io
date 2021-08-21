var visibleHeight, shouldZoomOut, zoomFunc;
class TreeNode {
    constructor(label, height) {
        this.left = null;
        this.right = null;
        this.label = label;
        if (height != undefined)
            this.height = height;
    }

    draw(ctx, xRange, y, parentX, parentY) {
        let x = xRange.getMid();
        let isRoot = parentX == null && parentY == null

        // Draw a line from current node to parent
        if (!isRoot) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(parentX, parentY);
            ctx.stroke();
        }
        else {
            shouldZoomOut = false;
        }
        
        // Draw children
        if (this.left != null)
            this.left.draw(ctx, new Range(xRange.left, x), y + 100, x, y);
        if (this.right != null)
            this.right.draw(ctx, new Range(x, xRange.right), y + 100, x, y);

        if (y >= visibleHeight) shouldZoomOut = true;
        if (xRange.getLength() < 5) shouldZoomOut = true;

        // Draw a the tree node and the label
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, 2 * Math.PI);
        ctx.fillStyle = this.height == undefined ? "#012548" : "#8B0000";
        //ctx.strokeStyle = this.height == undefined ? "#000000" : "#FFFFFF";
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#FFFFFF";
        var showHeight = false;
        if (this.height != undefined && showHeight) {
            ctx.fillText(this.label + "," + this.height, x-3, y+4);
        }
        else {
            ctx.fillText(this.label, x-3, y+4);
        }

        ctx.fillStyle = "#000000";
    }
}
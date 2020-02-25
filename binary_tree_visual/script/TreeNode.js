class TreeNode {
    constructor(label) {
        this.left = null;
        this.right = null;
        this.label = label;
    }

    draw(ctx, xRange, y, parentX, parentY) {
        let x = xRange.getMid();

        // Draw a line from current node to parent
        if (parentX != null && parentY != null) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(parentX, parentY);
            ctx.stroke();
        }

        // Draw children
        if (this.left != null)
            this.left.draw(ctx, new Range(xRange.left, x), y + 100, x, y);
        if (this.right != null)
            this.right.draw(ctx, new Range(x, xRange.right), y + 100, x, y);

        // Draw a the tree node and the label
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, 2 * Math.PI);
        ctx.fillStyle = "#012548";
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(this.label, x-3, y+4);
        ctx.fillStyle = "#000000";
    }
}
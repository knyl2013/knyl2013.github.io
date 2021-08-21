class AVL {
    constructor() {
        this.root = null;
    }
    getHeight(node) {
        if (node == null) return 0;
        return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }
    getBalanceFactor(node) {
        /*var leftHeight = node.left == null ? 0 : node.left.height;
        var rightHeight = node.right == null ? 0 : node.right.height;
        return leftHeight - rightHeight;*/
        return this.getHeight(node.left) - this.getHeight(node.right);
    }
    changeHeight(node, delta) {
        if (node == null) return;
        node.height += delta;
        this.changeHeight(node.left, delta);
        this.changeHeight(node.right, delta);
    }
    rightRotate(node) {
        var ans = new TreeNode(node.left.label, node.height);
        ans.right = node;
        ans.left = node.left.left;
        node.left = node.left.right;

        /*
        node.height--;
        this.changeHeight(node.right, 1);
        this.changeHeight(ans.left, -1);

        var leftHeight = ans.left == null ? 0 : ans.left.height;
        var rightHeight = ans.right == null ? 0 : ans.right.height;
        ans.height = Math.max(leftHeight, rightHeight) + 1;
        */

        return ans;
    }
    leftRotate(node) {
        var ans = new TreeNode(node.right.label, node.height);
        ans.left = node;
        ans.right = node.right.right;
        node.right = node.right.left;

        /*
        node.height--;
        this.changeHeight(node.left, 1);
        this.changeHeight(ans.right, -1);

        var leftHeight = ans.left == null ? 0 : ans.left.height;
        var rightHeight = ans.right == null ? 0 : ans.right.height;
        ans.height = Math.max(leftHeight, rightHeight) + 1;
        */

        return ans;   
    }
    handleLeftLeft(node) {
        return this.rightRotate(node);
    }
    handleLeftRight(node) {
        node.left = this.leftRotate(node.left);
        return this.rightRotate(node);
    }
    handleRightRight(node) {
        return this.leftRotate(node);
    }
    handleRightLeft(node) {
        node.right = this.rightRotate(node.right);
        return this.leftRotate(node);
    }
    insertHelper(node, val) {
        if (node == null) return new TreeNode(val, 1);
        if (node.label > val) {
            node.left = this.insertHelper(node.left, val);
        }
        else {
            node.right = this.insertHelper(node.right, val);
        }
        var balanceFactor = this.getBalanceFactor(node);
        var leftHeight = node.left == null ? 0 : node.left.height;
        var rightHeight = node.right == null ? 0 : node.right.height;
        //console.log(node.label + " " + leftHeight + " " + rightHeight);
        if (Math.abs(balanceFactor) <= 1) {
            node.height = Math.max(leftHeight, rightHeight) + 1;
            return node;    
        }
        else { // need to do rotation
            if (balanceFactor == 2) {
                var isLeftLeft = this.getBalanceFactor(node.left) == 1;
                if (isLeftLeft) return this.handleLeftLeft(node);
                else return this.handleLeftRight(node);
            }
            else { // balanceFactor == -2
                var isRightRight = this.getBalanceFactor(node.right) == -1;
                if (isRightRight) return this.handleRightRight(node);
                else return this.handleRightLeft(node);
            }
        }
        
    }

    insert(val) {
        this.root = this.insertHelper(this.root, val);
        /*
        if (this.root == null) {
            this.root = new TreeNode(val);
        }
        else {
            let prev = this.root;
            let cur = this.root;

            while (cur != null) {
                prev = cur;
                if (cur.label > val) {
                    cur = cur.left;
                }
                else {
                    cur = cur.right;
                }
            }

            if (prev.label > val)
                prev.left = new TreeNode(val);
            else
                prev.right = new TreeNode(val);
        }
        */
    }
}
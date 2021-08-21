class AVL {
    constructor() {
        this.root = null;
    }
    getBalanceFactor(node) {
        var leftHeight = node.left == null ? 0 : node.left.height;
        var rightHeight = node.right == null ? 0 : node.right.height;
        return leftHeight - rightHeight;
    }
    recalculateHeight(node) {
        if (node == null) return;
        var leftHeight = node.left == null ? 0 : node.left.height;
        var rightHeight = node.right == null ? 0 : node.right.height;
        node.height = Math.max(leftHeight, rightHeight) + 1;
    }
    rightRotate(node) {
        var ans = new TreeNode(node.left.label, node.height);
        ans.right = node;
        ans.left = node.left.left;
        node.left = node.left.right;

        this.recalculateHeight(node.left);
        this.recalculateHeight(node.right);
        this.recalculateHeight(node);

        return ans;
    }
    leftRotate(node) {
        var ans = new TreeNode(node.right.label, node.height);
        ans.left = node;
        ans.right = node.right.right;
        node.right = node.right.left;

        this.recalculateHeight(node.left);
        this.recalculateHeight(node.right);
        this.recalculateHeight(node);

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
        if (Math.abs(balanceFactor) <= 1) {
            this.recalculateHeight(node);
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
    }
}
class BST {
    constructor() {
        this.root = null;
    }

    insert(val) {
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
    }


}
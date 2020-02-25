class Range {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }

    getMid() {
        return (this.left + this.right) / 2
    }
}
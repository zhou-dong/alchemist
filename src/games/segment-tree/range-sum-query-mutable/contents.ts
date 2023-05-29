export const title = "Range Sum Query - Mutable";

export const formula = `interface SegmentTreeNode {
    lower: number;
    upper: number;
    sum: number;
    left?: SegmentTreeNode;
    right?: SegmentTreeNode;
}

class NumArray {

    private root: SegmentTreeNode;

    constructor(nums: number[]) {
        this.root = this.buildTree(0, nums.length - 1, nums);
    }

    private buildTree(lower: number, upper: number, nums: number[]): SegmentTreeNode {
        if (lower === upper) {
            return { lower, upper, sum: nums[lower] };
        }
        const mid = Math.floor((lower + upper) / 2);
        const left = this.buildTree(lower, mid, nums);
        const right = this.buildTree(mid + 1, upper, nums);
        return { lower, upper, sum: left.sum + right.sum, left, right };
    }

    update(index: number, val: number): void {
        this.updateTree(this.root, index, val);
    }

    private updateTree(node: SegmentTreeNode, index: number, val: number) {
        if (node.lower === index && node.upper === index) {
            node.sum = val;
            return;
        }
        const mid = Math.floor((node.lower + node.upper) / 2);
        if (index <= mid) {
            this.updateTree(node.left, index, val);
        } else {
            this.updateTree(node.right, index, val);
        }
        node.sum = node.left.sum + node.right.sum;
    }

    sumRange(left: number, right: number): number {
        return this.querySum(this.root, left, right);
    }

    private querySum(node: SegmentTreeNode, left: number, right: number): number {
        if (node.lower === left && node.upper === right) {
            return node.sum;
        }
        const mid = Math.floor((node.lower + node.upper) / 2);
        if (right <= mid) {
            return this.querySum(node.left, left, right);
        } else if (left > mid) {
            return this.querySum(node.right, left, right);
        } else {
            return this.querySum(node.left, left, mid) + this.querySum(node.right, mid + 1, right);
        }
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */`

export const description = `
Given an integer array **nums**, handle multiple queries of the following types:

**Update** the value of an element in **nums**.

Calculate the **sum** of the elements of **nums** between indices **left** and **right** inclusive where **left <= right**.

Implement the NumArray class:

- **NumArray(int[] nums)** Initializes the object with the integer array **nums**.
- **void update(int index, int val)** Updates the value of nums[index] to be val.
- **int sumRange(int left, int right)** Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

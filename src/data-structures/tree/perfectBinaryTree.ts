class TreeNode {

    x: number;
    index: number;
    left?: TreeNode;
    right?: TreeNode;
    alpha: number;

    constructor(index: number, alpha: number) {
        this.index = index;
        this.x = 0;
        this.alpha = alpha;
    }

    setX(): number {
        this.x = (this.setLeftX() + this.setRightX()) / 2;
        return this.x;
    }

    setLeftX(): number {
        if (this.left) {
            return this.left.setX();
        } else {
            return this.index * this.alpha;
        }
    }

    setRightX(): number {
        if (this.right) {
            return this.right.setX();
        } else {
            return this.index * this.alpha;
        }
    }
}

const calLeftChildIndex = (index: number): number => {
    return 2 * index + 1;
}

const calRightChildIndex = (index: number): number => {
    return 2 * index + 2;
}

export const buildPerfectBinaryTree = (level: number, alpha: number): TreeNode[] => {
    const size = Math.pow(2, level) - 1;
    const array: TreeNode[] = [];

    for (let i = 0; i < size; i++) {
        const node = new TreeNode(i, alpha);
        array.push(node);
    }

    for (let i = 0; i < size; i++) {
        const node = array[i];
        node.left = array[calLeftChildIndex(i)];
        node.right = array[calRightChildIndex(i)];
    }

    const root = array[0];
    root.setX();

    return array;
}

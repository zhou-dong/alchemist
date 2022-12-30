class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null

    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

export enum Direction {
    Left, Right
}

export interface Step {

    preorderLeft: number;
    preorderRight: number;

    inorderLeft: number;
    inorderRight: number;

    inorderRootIndex: number;
    leftTreeLength: number;

    parent?: TreeNode;
    direction?: Direction;
    node: TreeNode;
}

export interface InputOutput {
    preorder: number[];
    inorder: number[];
    steps: Step[];
}

export function buildTree(preorder: number[], inorder: number[]): InputOutput {

    const steps: Step[] = [];

    const inorderIndexMap = new Map<number, number>();

    inorder.map((value, index) => {
        inorderIndexMap.set(value, index);
    })

    const buildMyTree = (preorderLeft: number, preorderRight: number, inorderLeft: number, inorderRight: number, parent?: TreeNode, direction?: Direction): TreeNode | null => {
        if (preorderLeft > preorderRight) {
            return null;
        }

        const inorderRootIndex: number = inorderIndexMap.get(preorder[preorderLeft])!;
        const leftTreeLength = inorderRootIndex - inorderLeft;

        const root = new TreeNode(preorder[preorderLeft]);

        steps.push({ preorderLeft, preorderRight, inorderLeft, inorderRight, inorderRootIndex, leftTreeLength, node: root, parent, direction });

        root.left = buildMyTree(preorderLeft + 1, preorderLeft + leftTreeLength, inorderLeft, inorderRootIndex - 1, root, Direction.Left);
        root.right = buildMyTree(preorderLeft + leftTreeLength + 1, preorderRight, inorderRootIndex + 1, inorderRight, root, Direction.Right);

        return root;
    }

    const root: TreeNode | null = buildMyTree(0, preorder.length - 1, 0, inorder.length - 1);

    return { preorder, inorder, steps };
};

class TreeNode {
    val: number;
    left?: TreeNode;
    right?: TreeNode;
    constructor(val: number) {
        this.val = val;
    }
}

const getDepth = (node?: TreeNode): number => {
    if (node === undefined) {
        return 0;
    }
    const leftDepth: number = getDepth(node.left);
    const rightDepth: number = getDepth(node.right);
    return Math.max(leftDepth, rightDepth) + 1;
}

export function calDepth(preorder: number[], inorder: number[]): number {

    const inorderIndexMap = new Map<number, number>();

    inorder.forEach((value, index) => inorderIndexMap.set(value, index));

    const buildMyTree = (preorderLeft: number, preorderRight: number, inorderLeft: number, inorderRight: number): TreeNode | undefined => {
        if (preorderLeft > preorderRight) {
            return undefined;
        }

        const inorderRootIndex = inorderIndexMap.get(preorder[preorderLeft])!;
        const leftTreeLength = inorderRootIndex - inorderLeft;

        const root = new TreeNode(preorder[preorderLeft]);
        root.left = buildMyTree(preorderLeft + 1, preorderLeft + leftTreeLength, inorderLeft, inorderRootIndex - 1);
        root.right = buildMyTree(preorderLeft + leftTreeLength + 1, preorderRight, inorderRootIndex + 1, inorderRight);

        return root;
    }

    const root: TreeNode | undefined = buildMyTree(0, preorder.length - 1, 0, inorder.length - 1)

    return getDepth(root);
};

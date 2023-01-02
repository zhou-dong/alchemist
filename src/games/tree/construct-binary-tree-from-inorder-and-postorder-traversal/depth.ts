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

export function calDepth(inorder: number[], postorder: number[],): number {

    const inorderIndexMap = new Map<number, number>();
    inorder.forEach((value, index) => inorderIndexMap.set(value, index));

    const buildMyTree = (inorderLeft: number, inorderRight: number, postorderLeft: number, postorderRight: number): TreeNode | undefined => {
        if (postorderLeft > postorderRight) {
            return undefined;
        }

        const inorderRootIndex = inorderIndexMap.get(postorder[postorderRight])!;
        const leftTreeLength = inorderRootIndex - inorderLeft;

        const root = new TreeNode(postorder[postorderRight]);
        root.left = buildMyTree(inorderLeft, inorderRootIndex - 1, postorderLeft, postorderLeft + leftTreeLength - 1);
        root.right = buildMyTree(inorderRootIndex + 1, inorderRight, postorderLeft + leftTreeLength, postorderRight - 1);

        return root;
    }

    const root: TreeNode | undefined = buildMyTree(0, inorder.length - 1, 0, postorder.length - 1)

    return getDepth(root);
};

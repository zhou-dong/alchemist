import TreeNode from "../v2/node";

export const getDepth = <T>(node?: TreeNode<T>): number => {
    if (node === undefined) {
        return 0;
    }
    const leftDepth: number = getDepth(node.left);
    const rightDepth: number = getDepth(node.right);
    return Math.max(leftDepth, rightDepth) + 1;
}

export const getLeftChildIndex = (index: number): number => {
    return 2 * index + 1;
}

export const getRightChildIndex = (index: number): number => {
    return 2 * index + 2;
}

export const getParentIndex = (index: number): number => {
    return Math.floor((index - 1) / 2);
}

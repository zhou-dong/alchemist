export const title = "Count Complete Tree Nodes";

export const NodeDefinition = `/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
`;

export const formula0 = `
function countNodes(root: TreeNode | null): number {

    function getLeftLeafIndex(node: TreeNode, index: number): number {
        if (!node.left) {
            return index;
        }
        return getLeftLeafIndex(node.left, 2 * index + 1);
    }

    // Go right first, so the first value, which is >= leftLeafIndex is the target leaf.
    function rightLeftDfs(node: TreeNode | null, index: number, leftLeafIndex: number) {
        if (!node) {
            return 0;
        }

        if (index >= leftLeafIndex) {
            return index;
        }

        return rightLeftDfs(node.right, 2 * index + 2, leftLeafIndex) || rightLeftDfs(node.left, 2 * index + 1, leftLeafIndex);
    }

    if (!root) return 0;

    const leftLeafIndex = getLeftLeafIndex(root, 0);

    return rightLeftDfs(root, 0, leftLeafIndex) + 1;
};`

export const formula1 = `
function countNodes(root: TreeNode | null): number {

    function countLevel(node: TreeNode | null, level: number): number {
        if (!node) {
            return level;
        }
        return countLevel(node.left, level + 1);
    }

    function dfs(node: TreeNode | null) {
        if (!node) {
            return 0;
        }

        const leftLevels = countLevel(node.left, 0);
        const rightLevels = countLevel(node.right, 0);

        if (leftLevels === rightLevels) {
            return dfs(node.right) + Math.pow(2, leftLevels);
        } else {
            return dfs(node.left) + Math.pow(2, rightLevels);
        }
    }

    return dfs(root);
};`

export const description = `
Given the **root** of a complete binary tree, return the number of the nodes in the tree.

According to Wikipedia, every level, except possibly the last, is completely filled in a complete binary tree, 
and all nodes in the last level are as far left as possible. It can have between **1** and **2^h** nodes inclusive at the last level **h**.

Design an algorithm that runs in less than **O(n)** time complexity.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

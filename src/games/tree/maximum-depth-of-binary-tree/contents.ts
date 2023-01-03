export const title = "Maximum Depth of Binary Tree";

export const formula = `/**
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
function maxDepth(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    const left = maxDepth(root.left);
    const right = maxDepth(root.right);
    return Math.max(left, right) + 1;
};`;

export const description = `
Given the **root** of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

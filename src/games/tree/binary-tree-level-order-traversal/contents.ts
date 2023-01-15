export const title = "Binary Tree Level Order Traversal";

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

function levelOrder(root: TreeNode | null): number[][] {
    const result: number[][] = [];
    if (!root) {
        return result;
    }

    const queue: TreeNode[] = [];
    queue.push(root);

    while (queue.length !== 0) {
        const level: number[] = [];
        const length = queue.length;
        for (let i = 0; i < length; i++) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        result.push(level);
    }

    return result;
};`;

export const description = `
Given the **root** of a binary tree, return the ***level order traversal of its nodes' values***. (i.e., from left to right, level by level).
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

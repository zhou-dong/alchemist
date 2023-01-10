export const title = "Kth Smallest Element in a BST";

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

// inorder
function kthSmallest(root: TreeNode | null, k: number): number {
    let index = 0;
    let value = 0;

    function dfs(node: TreeNode | null) {
        if (node === null) {
            return;
        }

        dfs(node.left);

        index = index + 1;
        if (index === k) {
            value = node.val;
            return;
        }

        dfs(node.right);
    }

    dfs(root);
    return value;
};`;

export const description = `
Given the **root** of a binary search tree, and an integer **k**, return the **kth** smallest value ***(1-indexed)*** of all the values of the nodes in the tree.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;


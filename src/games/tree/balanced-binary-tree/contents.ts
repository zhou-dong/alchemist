export const title = "Balanced Binary Tree";

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

function isBalanced(root: TreeNode | null): boolean {

    function height(node: TreeNode | null): number {
        if (node === null) {
            return 0;
        }

        const left = height(node.left);
        if (left === -1) {
            return -1;
        }

        const right = height(node.right);
        if (right === -1) {
            return -1;
        }

        const different = Math.abs(right - left);
        if (different > 1) {
            return -1;
        }

        return Math.max(left, right) + 1;
    }

    return height(root) !== -1;
};`;

export const description = `
Given a binary tree, determine if it is ***height-balanced***.
`;

export const solution = `/**
* If a node is balanced, return the height of the node.
* If a node is unbalanced, return -1 as the height of the node.
*/
function isBalanced(root: TreeNode | null): boolean {

    function height(node: TreeNode | null): number {
        if (node === null) {
            return 0;
        }

        const left = height(node.left);
        if (left === -1) {
            return -1;
        }

        const right = height(node.right);
        if (right === -1) {
            return -1;
        }

        const different = Math.abs(right - left);
        if (different > 1) {
            return -1;
        }

        return Math.max(left, right) + 1;
    }

    return height(root) !== -1;
};`;

export const usecases = '';

export const example = ``;

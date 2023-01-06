export const title = "Symmetric Tree";

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

function isSymmetric(root: TreeNode | null): boolean {

    function dfs(left: TreeNode | null, right: TreeNode | null) {

        if (left === null && right === null) {
            return true;
        }

        if (left === null || right === null) {
            return false;
        }

        if (left.val !== right.val) {
            return false;
        }

        return dfs(left.left, right.right) && dfs(left.right, right.left);
    }

    return dfs(root.left, root.right);
};`;

export const description = `
Given the **root** of a binary tree, ***check whether it is a mirror of itself*** (i.e., symmetric around its center).
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

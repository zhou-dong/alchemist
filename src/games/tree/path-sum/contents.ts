export const title = "Path Sum";

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

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {

    function dfs(node: TreeNode | null, num: number): boolean {
        if (node === null) {
            return false;
        }
        if (isLeaf(node) && node.val + num === targetSum) {
            return true;
        }
        return dfs(node.left, node.val + num) || dfs(node.right, node.val + num);
    }

    return dfs(root, 0);
};

function isLeaf(node: TreeNode) {
    return !node.left && !node.right;
};`;

export const description = `
Given the **root** of a binary tree and an integer **targetSum**, 
return **true** if the tree has a ***root-to-leaf*** path such that adding up all the values along the path equals **targetSum**.

A **leaf** is a node with no children.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

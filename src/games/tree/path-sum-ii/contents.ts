export const title = "Path Sum II";

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

function pathSum(root: TreeNode | null, targetSum: number): number[][] {

    const result: number[][] = [];

    function dfs(node: TreeNode | null, nums: number[]) {
        if (node === null) {
            return;
        }

        const sum = [...nums, node.val];
        if (!node.left && !node.right) {
            if (sum.reduce((a, b) => a + b, 0) === targetSum) {
                result.push(sum);
            }
        }

        dfs(node.left, sum);
        dfs(node.right, sum);
    }

    dfs(root, []);
    return result;
};`;

export const description = `
Given the **root** of a binary tree and an integer **targetSum**, 
return all **root-to-leaf** paths where the sum of the node values in the path equals targetSum. 
Each path should be returned as a list of the node values, not node references.

A **root-to-leaf** path is a path starting from the root and ending at any leaf node. 

A **leaf** is a node with no children.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

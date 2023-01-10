export const title = "Binary Tree Right Side View";

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

// preorder, iterate right subtree first.
function rightSideView(root: TreeNode | null): number[] {
    const result: number[] = [];

    function dfs(node: TreeNode | null, depth: number) {
        if (node === null) {
            return;
        }

        if (result.length === depth) {
            result.push(node.val);
        }

        dfs(node.right, depth + 1);
        dfs(node.left, depth + 1);
    }

    dfs(root, 0);
    return result;
};`;

export const description = `
Given the **root** of a binary tree, imagine yourself standing on the **right side** of it, 
return the values of the nodes you can see ordered from top to bottom.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

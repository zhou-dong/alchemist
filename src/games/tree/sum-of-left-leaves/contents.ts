export const title = "Sum of Left Leaves";

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

// preorder
function sumOfLeftLeaves(root: TreeNode | null): number {

    let sum = 0;
    function dfs(node: TreeNode | null) {
        if (node === null) {
            return null;
        }

        if (node.left && isLeftNode(node.left)) {
            sum += node.left.val;
        }

        dfs(node.left);
        dfs(node.right);
    }

    function isLeftNode(node: TreeNode) {
        return !node.left && !node.right;
    }

    dfs(root);
    return sum;
};`;

const formula1 = `// preorder and postorder
function sumOfLeftLeaves(root: TreeNode | null): number {

    function isLeftNode(node: TreeNode) {
        return !node.left && !node.right; 
    }

    function dfs(node: TreeNode | null): number {
        if (node===null) {
            return 0;
        }
        
        let sum = 0;

        if (node.left && isLeftNode(node.left)) {
            sum += node.left.val;
        }

        sum += dfs(node.left);
        sum += dfs(node.right);
        return sum;
    }

    return dfs(root);
};`

export const description = `
Given the **root** of a binary tree, return the sum of all left leaves.

A **leaf** is a node with no children. A **left leaf** is a leaf that is the left child of another node.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;


export const title = "Lowest Common Ancestor of a Binary Search Tree";

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
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    if (root === null || root === p || root === q) {
        return root;
    }

    if (root.val > Math.min(p.val, q.val) && root.val < Math.max(p.val, q.val)) {
        return root;
    }

    return lowestCommonAncestor(root.left, p, q) || lowestCommonAncestor(root.right, p, q);
};`;

export const description = `
Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the ***definition of LCA on Wikipedia***: 
“The lowest common ancestor is defined between two nodes **p** and **q** as the lowest node in **T** that has both **p** and **q** as descendants 
(where we allow ***a node to be a descendant of itself***).”
`;

export const solution = ``;

export const usecases = '';

export const example = ``;


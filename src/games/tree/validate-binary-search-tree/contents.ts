export const title = "Validate Binary Search Tree";

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
*

function isValidBST(root: TreeNode | null): boolean {

    function isBST(root: TreeNode | null, lower: number, upper: number): boolean {
        if (root === null) {
            return true;
        }

        if (root.val <= lower || root.val >= upper) {
            return false;
        }

        return isBST(root.left, lower, root.val) && isBST(root.right, root.val, upper);
    }

    return isBST(root, -Infinity, Infinity);
};`;

export const description = `
Given the **root** of a binary tree, determine if it is a valid binary search tree (BST).

A ***valid BST*** is defined as follows:

- The left subtree of a node contains only nodes with keys **less than** the node's key.
- The right subtree of a node contains only nodes with keys **greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.
`;

export const usecases = '';

export const example = '';

export const title = "Recover Binary Search Tree";


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
function recoverTree(root: TreeNode | null): void {
    let errorOne: TreeNode | null = null;
    let errorTwo: TreeNode | null = null;
    let prev: TreeNode | null = null;

    const inorder = (node: TreeNode | null) => {
        if (!node) {
            return;
        }
        inorder(node.left);
        if (prev && prev.val >= node.val) {
            if (!errorOne) {
                errorOne = prev;
            } 
            if (errorOne) {
                errorTwo = node;
            }
        }
        prev = node;
        inorder(node.right);
    }

    inorder(root);
    if(errorOne && errorTwo) {
        swap(errorOne, errorTwo);
    }
};

const swap = (a: TreeNode, b: TreeNode) => {
    const temp = a.val;
    a.val = b.val;
    b.val = temp;
};`;

export const description = `
You are given the **root** of a binary search tree (BST), where the values of exactly two nodes of the tree were swapped by mistake. 
Recover the tree without changing its structure.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

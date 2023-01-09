export const title = "Populating Next Right Pointers in Each Node";

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
function connect(root: Node | null): Node | null {
    if (root === null) {
        return null;
    }

    if (root.left) {
        root.left.next = root.right;
    }

    if (root.right && root.next) {
        if (root.next.left) {
            root.right.next = root.next.left;
        } else {
            root.right.next = root.next.right;
        }
    }

    connect(root.left);
    connect(root.right);

    return root;
};`;

export const description = `
You are given a **perfect binary tree** where all leaves are on the same level, and every parent has two children. 

Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;


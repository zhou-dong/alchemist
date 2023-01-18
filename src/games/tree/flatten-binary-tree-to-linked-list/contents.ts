export const title = "Flatten Binary Tree to Linked List";

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

function flatten(root: TreeNode | null): void {
    if (!root) {
        return;
    }
    if (root.left) {
        const next = findRight(root.left);
        next.right = root.right;
        root.right = root.left;
        root.left = null;
    }
    flatten(root.right);
};

function findRight(node: TreeNode) {
    if (node.right === null) {
        return node;
    }
    return findRight(node.right);
};`;

export const description = `
Given the **root** of a binary tree, flatten the tree into a "linked list":

- The "linked list" should use the same **TreeNode** class where the **right** child pointer points to the next node in the list and the **left** child pointer is always **null**.
- The "linked list" should be in the same order as a **pre-order traversal** of the binary tree.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

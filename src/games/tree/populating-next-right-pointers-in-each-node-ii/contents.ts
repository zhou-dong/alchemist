export const title = "Populating Next Right Pointers in Each Node II";

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
function getNext(node: Node | null): Node | null {
    if (!node) {
        return null;
    }

    if (node.left || node.right) {
        return node;
    }

    return getNext(node.next);
}

function connect(root: Node | null): Node | null {
    if (!root) {
        return null;
    }

    const next = getNext(root.next);

    if (root.left) {
        if (root.right) {
            root.left.next = root.right;
        } else if (next) {
            if (next.left) {
                root.left.next = next.left;
            } else {
                root.left.next = next.right;
            }
        }
    }

    if (root.right) {
        if (next) {
            if (next.left) {
                root.right.next = next.left;
            } else {
                root.right.next = next.right;
            }
        }
    }

    connect(root.right); // must go right first!!
    connect(root.left);

    return root;
};`;

export const description = `
You are given a **binary tree**.

Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;


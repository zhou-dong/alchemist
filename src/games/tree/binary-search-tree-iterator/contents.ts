export const title = "Binary Search Tree Iterator";

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

class BSTIterator {
    private stack: TreeNode[];

    constructor(root: TreeNode | null) {
        this.stack = [];
        this.pushToStack(root);
    }

    next(): number {
        const node = this.stack.pop();
        this.pushToStack(node.right);
        return node.val;
    }

    hasNext(): boolean {
        return this.stack.length > 0;
    }

    private pushToStack(root?: TreeNode) {
        if (!root) {
            return;
        }
        this.stack.push(root);
        this.pushToStack(root.left);
    }
}`;

export const description = `
Implement the **BSTIterator** class that represents an iterator over the **in-order traversal** of a binary search tree (BST):
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

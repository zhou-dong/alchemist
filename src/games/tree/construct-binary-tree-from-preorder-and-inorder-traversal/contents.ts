export const title = "Construct Binary Tree from Preorder and Inorder Traversal";

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
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {

    const inorderIndexMap = new Map<number, number>();
    inorder.forEach((num, i) => inorderIndexMap.set(num, i));

    const buildMyTree = (preorderLeft: number, preorderRight: number, inorderLeft: number, inorderRight: number): TreeNode | null => {
        if (preorderLeft > preorderRight) {
            return null;
        }

        const inorderRootIndex = inorderIndexMap.get(preorder[preorderLeft])
        const leftTreeLength = inorderRootIndex - inorderLeft;

        const root = new TreeNode(preorder[preorderLeft]);
        root.left = buildMyTree(preorderLeft + 1, preorderLeft + leftTreeLength, inorderLeft, inorderRootIndex - 1);
        root.right = buildMyTree(preorderLeft + leftTreeLength + 1, preorderRight, inorderRootIndex + 1, inorderRight);
        return root;
    }

    return buildMyTree(0, preorder.length - 1, 0, inorder.length - 1)
};`;

export const description = `
Given two integer arrays **preorder** and **inorder** where **preorder** is the preorder traversal of a binary tree 

and **inorder** is the inorder traversal of the same tree, construct and return the ***binary tree***.
`;

export const usecases = '';

export const example = '';

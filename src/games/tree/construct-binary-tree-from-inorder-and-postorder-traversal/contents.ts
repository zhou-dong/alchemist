export const title = "Construct Binary Tree from Inorder and Postorder Traversal";

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
function buildTree(inorder: number[], postorder: number[]): TreeNode | null {

    const inorderIndexMap: Map<number, number> = new Map();
    inorder.forEach((num, i) => inorderIndexMap.set(num, i));

    function buildMyTree(inorderLeft: number, inorderRight: number, postorderLeft: number, postorderRight: number): TreeNode | null {
        if (postorderLeft > postorderRight) {
            return null;
        }

        const inorderRootIndex = inorderIndexMap.get(postorder[postorderRight])!;
        const leftTreeLength = inorderRootIndex - inorderLeft;

        const root = new TreeNode(postorder[postorderRight]);
        root.left = buildMyTree(inorderLeft, inorderRootIndex - 1, postorderLeft, postorderLeft + leftTreeLength - 1);
        root.right = buildMyTree(inorderRootIndex + 1, inorderRight, postorderLeft + leftTreeLength, postorderRight - 1);
        return root;
    }

    return buildMyTree(0, inorder.length - 1, 0, postorder.length - 1);
};`;

export const description = `
Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree 

and postorder is the postorder traversal of the same tree, construct and return the binary tree.
`;

export const usecases = '';

export const example = '';

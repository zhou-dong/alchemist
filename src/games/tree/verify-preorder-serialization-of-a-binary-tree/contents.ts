export const title = "Verify Preorder Serialization of a Binary Tree";

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


`;

export const description = `
One way to serialize a binary tree is to use **preorder traversal**. 
When we encounter a non-null node, we record the node's value. If it is a null node, we record using a sentinel value such as ***'#'***.

Given a string of comma-separated values **preorder**, return **true** if it is a correct preorder traversal serialization of a binary tree.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

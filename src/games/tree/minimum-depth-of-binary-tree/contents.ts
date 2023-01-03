export const title = "Minimum Depth of Binary Tree";

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

function minDepth(root: TreeNode | null): number {

   if(root === null) {
       return 0;
   }

   const left = minDepth(root.left);
   const right = minDepth(root.right);

   if(root.left === null) {
       return right + 1;
   }

   if(root.right === null) {
       return left + 1;
   }

   return Math.min(left, right) + 1;
};`;

export const description = `
Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

**Note**: A leaf is a node with ***no*** children.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

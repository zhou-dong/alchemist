export const title = "Convert Sorted Array to Binary Search Tree";

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

function sortedArrayToBST(nums: number[]): TreeNode | null {

    function buildTree(left: number, right: number): TreeNode | null {
        if (left > right) {
            return null;
        }
        const mid = ~~((left + right) / 2);

        const node = new TreeNode(nums[mid]);
        node.left = buildTree(left, mid - 1);
        node.right = buildTree(mid + 1, right);
        return node;
    }

    return buildTree(0, nums.length - 1);
};`;

export const description = `
Given an integer array **nums** where the elements are sorted in **ascending order**, convert it to a ***height-balanced*** binary search tree.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

export const title = "Sum Root to Leaf Numbers";

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

function sumNumbers(root: TreeNode | null): number {

    function dfs(node: TreeNode | null, sum: number): number {
        if (node === null) {
            return 0;
        }

        if (!node.left && !node.right) {
            return sum * 10 + node.val;
        }

        return dfs(node.left, sum * 10 + node.val) + dfs(node.right, sum * 10 + node.val);
    }

    return dfs(root, 0);
};`;

export const description = `
You are given the **root** of a binary tree containing digits from 0 to 9 only.

Each root-to-leaf path in the tree represents a number.

- For example, the root-to-leaf path **1 -> 2 -> 3** represents the number **123**.

Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a 32-bit integer.

A **leaf** node is a node with no children.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

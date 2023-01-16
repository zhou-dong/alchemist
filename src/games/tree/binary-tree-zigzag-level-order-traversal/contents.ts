export const title = "Binary Tree Zigzag Level Order Traversal";

export const treeNodeDefine = `/**
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
`

export const formula0 = `
function zigzagLevelOrder(root: TreeNode | null): number[][] {
    const result: number[][] = [];

    function dfs(node: TreeNode | null, level: number) {
        if (node === null) {
            return;
        }
        if (result.length === level) {
            result.push([]);
        }
        if ((level % 2) === 0) {
            result[level].push(node.val);
        } else {
            result[level].unshift(node.val);
        }
        dfs(node.left, level + 1);
        dfs(node.right, level + 1);
    }

    dfs(root, 0);
    return result;
};`;

export const formula1 = `/**
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

function zigzagLevelOrder(root: TreeNode | null): number[][] {
    const result: number[][] = [];
    if (!root) {
        return result;
    }

    const queue: TreeNode[] = [];
    queue.push(root);

    let reverse = false;
    while (queue.length !== 0) {
        const length = queue.length;
        const level: number[] = [];
        for (let i = 0; i < length; i++) {
            const node = queue.shift();
            if (reverse) {
                level.unshift(node.val);
            } else {
                level.push(node.val);
            }

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        reverse = !reverse
        result.push(level);
    }

    return result;
};`;

export const description = `
Given the **root** of a binary tree, return the ***zigzag level order traversal of its nodes' values***. 
(i.e., from left to right, then right to left for the next level and alternate between).
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

export const title = "Binary Tree Level Order Traversal II";

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

export const formula1 = `
function levelOrderBottom(root: TreeNode | null): number[][] {

    const result: number[][] = [];

    function dfs(node: TreeNode | null, level: number) {
        if (node === null) {
            return;
        }
        if (result.length === level) {
            result.push([]);
        }
        result[level].push(node.val);
        dfs(node.left, level + 1); 
        dfs(node.right, level + 1);
    }

    dfs(root, 0);
    return result.reverse();
};`

export const formula0 = `/**
function levelOrderBottom(root: TreeNode | null): number[][] {
    const result: number[][] = [];
    if (!root) {
        return result;
    }

    const queue: TreeNode[] = [];
    queue.push(root);

    while (queue.length !== 0) {
        const level: number[] = [];
        const length = queue.length;
        for (let i = 0; i < length; i++) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        result.unshift(level);
    }

    return result;
};`;

export const description = `
Given the **root** of a binary tree, return the ***bottom-up level order traversal of its nodes' values***. (i.e., from left to right, level by level from leaf to root).
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

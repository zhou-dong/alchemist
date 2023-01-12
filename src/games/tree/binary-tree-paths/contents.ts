export const title = "Binary Tree Paths";


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
function binaryTreePaths(root: TreeNode | null): string[] {

    const paths: string[] = [];

    function dfs(node: TreeNode | null, parents: number[]) {
        if (node === null) {
            return;
        }

        const path = [...parents, node.val];
        if (!node.left && !node.right) {
            paths.push(path.join("->"));
            return;
        }

        dfs(node.left, path);
        dfs(node.right, path);
    }

    dfs(root, []);
    return paths;
};`;

export const description = `
Given the **root** of a binary tree, return all root-to-leaf paths in ***any order***.

A **leaf** is a node with no children.
`;

export const solution = ``;

export const usecases = '';

export const example = `

---

#### Example

- Input: root = [1,2,3,null,5]
- Output: ["1->2->5", "1->3"]
`;

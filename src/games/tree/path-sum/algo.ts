import TreeNode from "../../../data-structures/tree/nodes/v1/node";

export enum Direction {
    Left, Right, Back
}

export interface Step {
    node?: TreeNode<number>;
    sum: number;
    hasPathSum: boolean;
}

function isLeaf(node: TreeNode<number>) {
    return !node.left && !node.right;
}

export function buildSteps(targetSum: number, root?: TreeNode<number>): Step[] {
    const steps: Step[] = [];

    function hasPathSum(root: TreeNode<number> | undefined, targetSum: number): boolean {

        function dfs(node: TreeNode<number> | undefined, num: number): boolean {
            if (node === undefined) {
                return false;
            }

            const sum = node.val.value + num;

            if (isLeaf(node) && sum === targetSum) {
                steps.push({ node, sum, hasPathSum: true });
                return true;
            }

            steps.push({ node, sum, hasPathSum: false });

            return dfs(node.left, sum) || dfs(node.right, sum);
        }

        return dfs(root, 0);
    };

    hasPathSum(root, targetSum);
    return steps;
}

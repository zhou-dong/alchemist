import TreeNode from "../../../data-structures/tree/nodes/v1/node";

export enum Direction {
    Left, Right, Back
}

export interface Step {
    node: TreeNode<number>;
    sum: number;
    hasPathSum: boolean;
    paths: number[][];
}

function isLeaf(node: TreeNode<number>) {
    return !node.left && !node.right;
}

function clone(paths: number[][]): number[][] {
    return paths.map(path => [...path]);
}

export function buildSteps(targetSum: number, root?: TreeNode<number>): Step[] {
    const steps: Step[] = [];


    function hasPathSum(root: TreeNode<number> | undefined, targetSum: number) {

        const paths: number[][] = [];

        function dfs(node: TreeNode<number> | undefined, nums: number[]) {
            if (node === undefined) {
                return false;
            }

            const path: number[] = [...nums, node.val.value];
            const sum = path.reduce((a, b) => a + b, 0);

            if (isLeaf(node) && sum === targetSum) {
                paths.push(path);
                steps.push({ node, sum, hasPathSum: true, paths: clone(paths) });
                return true;
            }

            steps.push({ node, sum, hasPathSum: false, paths: clone(paths) });

            dfs(node.left, path);
            dfs(node.right, path);
        }

        dfs(root, []);
    };

    hasPathSum(root, targetSum);
    return steps;
}

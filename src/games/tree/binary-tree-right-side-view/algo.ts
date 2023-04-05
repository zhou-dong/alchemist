import TreeNode from "../../../data-structures/tree/nodes/v1/node";

export enum Direction {
    Left, Right, Back
}

export interface Step {
    node: TreeNode<number>;
    isRightSide: boolean;
    result: number[];
}

export function buildSteps(root?: TreeNode<number>): Step[] {
    const steps: Step[] = [];

    function rightSideView(root?: TreeNode<number>): number[] {
        const result: number[] = [];

        function dfs(node: TreeNode<number> | undefined, depth: number) {
            if (!node) {
                return;
            }

            let isRightSide = false;
            if (result.length === depth) {
                result.push(node.val.value);
                isRightSide = true;
            }

            steps.push({ node, isRightSide, result: [...result] });
            dfs(node.right, depth + 1);
            dfs(node.left, depth + 1);
        }

        dfs(root, 0);
        return result;
    };

    rightSideView(root);
    return steps;
}

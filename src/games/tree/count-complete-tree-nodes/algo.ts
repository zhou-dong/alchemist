import TreeNode from "../../../data-structures/tree/nodes/v1/node";

export enum Direction {
    Left, Right
}

export enum ActionType {
    CountLevel, DFS
}

export interface Step {
    node: TreeNode<string>;
    actionType: ActionType;
    count: number;
    direction?: Direction;
}

export function buildSteps(root?: TreeNode<string>): Step[] {
    const steps: Step[] = [];

    let count: number = 0;

    function countLevel(node: TreeNode<string> | undefined, level: number): number {
        if (!node) {
            return level;
        }
        steps.push({ node, actionType: ActionType.CountLevel, count });
        return countLevel(node.left, level + 1);
    }

    function dfs(node?: TreeNode<string>): number {
        if (!node) {
            return 0;
        }

        const leftLevels = countLevel(node.left, 0);
        const rightLevels = countLevel(node.right, 0);

        if (leftLevels === rightLevels) {
            count += Math.pow(2, leftLevels);
            steps.push({ node, actionType: ActionType.DFS, direction: Direction.Right, count });
            return dfs(node.right) + Math.pow(2, leftLevels);
        } else {
            count += Math.pow(2, rightLevels);
            steps.push({ node, actionType: ActionType.DFS, direction: Direction.Left, count });
            return dfs(node.left) + Math.pow(2, rightLevels);
        }
    }

    dfs(root);
    return steps;
}

import TreeNode from "../../../data-structures/tree/node";

export enum Direction {
    Left, Right, Back
}

export interface Step {
    node: TreeNode<string>;
    direction?: Direction;
}

export function buildSteps(root?: TreeNode<string>): Step[] {
    const steps: Step[] = [];

    function connect(node?: TreeNode<string>, direction?: Direction) {
        if (node === undefined) {
            return;
        }
        connect(node.left, Direction.Left);
        steps.push({ node, direction });
        connect(node.right, Direction.Right);
    }

    connect(root);
    return steps;
}

import TreeNode from "../../../data-structures/tree/nodes/v1/node";

export enum Direction {
    Left, Right, Back
}

export interface Step {
    node?: TreeNode<string>;
    direction?: Direction;
}

export function buildSteps(root?: TreeNode<string>): Step[] {
    const steps: Step[] = [];

    function connect(node?: TreeNode<string>, direction?: Direction) {
        if (node === undefined) {
            return;
        }
        steps.push({ node, direction });
        connect(node.right, Direction.Right); // go right first
        connect(node.left, Direction.Left);
    }

    connect(root);
    return steps;
}

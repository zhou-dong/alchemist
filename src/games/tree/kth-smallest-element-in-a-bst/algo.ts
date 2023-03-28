import TreeNode from "../../../data-structures/tree/nodes/v1/node";

export enum Direction {
    Left, Right, Back
}

export interface Step {
    index: number;
    node?: TreeNode<string>;
    direction?: Direction;
}

export function buildSteps(k: number, root?: TreeNode<string>): Step[] {
    const steps: Step[] = [];

    let index: number = 0;

    function kthSmallest(node?: TreeNode<string>, direction?: Direction) {
        if (node === undefined) {
            return;
        }

        kthSmallest(node.left, Direction.Left);
        index = index + 1;
        if (index > k) {
            return;
        }
        steps.push({ node, direction, index });
        kthSmallest(node.right, Direction.Right);
    }

    kthSmallest(root);
    return steps;
}

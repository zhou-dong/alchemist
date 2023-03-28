import TreeNode from "../../../data-structures/tree/nodes/v1/node";

export enum Direction {
    Left, Right, Back
}

export interface Step {
    node: TreeNode<any>;
    depth?: number;
    direction?: Direction;
}

export function buildSteps<T>(root?: TreeNode<T>): Step[] {
    const steps: Step[] = [];

    function minDepth<T>(node?: TreeNode<T>, direction?: Direction, depth?: number): number {
        if (node === undefined) {
            return 0;
        }

        steps.push({ node, direction, depth });

        const left = minDepth(node.left, Direction.Left, depth);
        const right = minDepth(node.right, Direction.Right, depth);

        if (node.left === undefined) {
            steps.push({ node, direction: Direction.Back, depth: right + 1 });
            return right + 1;
        }

        if (node.right === undefined) {
            steps.push({ node, direction: Direction.Back, depth: left + 1 });
            return left + 1;
        }

        const min = Math.min(left, right) + 1;
        steps.push({ node, direction: Direction.Back, depth: min });

        return min;
    };

    minDepth(root);
    return steps;
}

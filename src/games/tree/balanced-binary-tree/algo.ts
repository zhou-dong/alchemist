import TreeNode from "../../../data-structures/tree/node";

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

    function height<T>(node?: TreeNode<T>, direction?: Direction, depth?: number): number {
        if (node === undefined) {
            return 0;
        }

        steps.push({ node, direction, depth });

        const left = height(node.left, Direction.Left, depth);
        if (left === -1) {
            steps.push({ node, direction: Direction.Back, depth: -1 });
            return -1;
        }

        const right = height(node.right, Direction.Right, depth);
        if (right === -1) {
            steps.push({ node, direction: Direction.Back, depth: -1 });
            return -1;
        }

        const different = Math.abs(right - left);
        if (different > 1) {
            steps.push({ node, direction: Direction.Back, depth: -1 });
            return -1;
        }

        const max = Math.max(left, right) + 1;
        steps.push({ node, direction: Direction.Back, depth: max });

        return max;
    };

    height(root);
    return steps;
}

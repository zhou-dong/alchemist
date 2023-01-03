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

    function maxDepth<T>(node?: TreeNode<T>, direction?: Direction, depth?: number): number {
        if (node === undefined) {
            return 0;
        }

        steps.push({ node, direction, depth });

        const left = maxDepth(node.left, Direction.Left, depth);
        const right = maxDepth(node.right, Direction.Right, depth);

        const max = Math.max(left, right) + 1;
        steps.push({ node, direction: Direction.Back, depth: max });

        return max;
    };

    maxDepth(root);
    return steps;
}

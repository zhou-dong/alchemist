import TreeNode from "../../../data-structures/tree/node";

export enum Direction {
    Left, Right, Back
}

export interface Step {
    left?: TreeNode<string>;
    right?: TreeNode<string>;
    symmetric?: boolean;
    direction?: Direction;
}

export function buildSteps(root?: TreeNode<string>): Step[] {
    const steps: Step[] = [];

    function isSymmetric(left?: TreeNode<string>, right?: TreeNode<string>, direction?: Direction): boolean {

        if (left === undefined && right === undefined) {
            return true;
        }

        if (left === undefined || right === undefined) {
            steps.push({ left, right, direction, symmetric: false });
            return false;
        }

        if (left.val.value !== right.val.value) {
            steps.push({ left, right, direction, symmetric: false });
            return false;
        }

        steps.push({ left, right, direction, symmetric: true });

        const isLeftSymmetric = isSymmetric(left.left, right.right, Direction.Left);
        if (!isLeftSymmetric) {
            steps.push({ left, right, direction, symmetric: false });
            return false;
        }

        const isRightSymmetric = isSymmetric(left.right, right.left, Direction.Right);
        if (!isRightSymmetric) {
            steps.push({ left, right, direction, symmetric: false });
            return false;
        }

        steps.push({ left, right, direction, symmetric: true });

        return true;
    }

    steps.push({ left: root, right: root, symmetric: true });
    const symmetric = isSymmetric(root?.left, root?.right);
    steps.push({ left: root, right: root, symmetric });
    return steps;
}

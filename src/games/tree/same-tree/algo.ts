import TreeNode from "../../../data-structures/tree/nodes/v1/node";

export enum Direction {
    Left, Right, Back
}

export interface Step {
    p?: TreeNode<string>;
    q?: TreeNode<string>;
    isSame?: boolean;
    direction?: Direction;
}

export function buildSteps(p?: TreeNode<string>, q?: TreeNode<string>): Step[] {
    const steps: Step[] = [];

    function isSameTree(p?: TreeNode<string>, q?: TreeNode<string>, direction?: Direction): boolean {

        if (p === undefined && q === undefined) {
            return true;
        }

        if (p === undefined || q === undefined) {
            steps.push({ p, q, direction, isSame: false });
            return false;
        }

        if (p.val.value !== q.val.value) {
            steps.push({ p, q, direction, isSame: false });
            return false;
        }

        steps.push({ p, q, direction, isSame: true });

        const isLeftTreeSame = isSameTree(p.left, q.left, Direction.Left);
        if (!isLeftTreeSame) {
            steps.push({ p, q, direction, isSame: false });
            return false;
        }

        const isRightTreeSame = isSameTree(p.right, q.right, Direction.Right);
        if (!isRightTreeSame) {
            steps.push({ p, q, direction, isSame: false });
            return false;
        }

        steps.push({ p, q, direction, isSame: true });
        return true;
    };

    isSameTree(p, q);
    return steps;
}

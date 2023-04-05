import TreeNode from "../../../data-structures/tree/nodes/v1/node";

export enum Direction {
    Left, Right, Back
}

export interface Step {
    node?: TreeNode<number>;
    p: number;
    q: number;
    direction?: Direction;
    islowestCommonAncestor?: boolean;
}

export function buildSteps(p: number, q: number, root?: TreeNode<number>): Step[] {
    const steps: Step[] = [];

    function lowestCommonAncestor(p: number, q: number, node?: TreeNode<number>, direction?: Direction): TreeNode<number> | undefined {
        if (node === undefined) {
            return undefined;
        }

        if (node.val.value === p || node.val.value === q) {
            steps.push({ node, p, q, direction, islowestCommonAncestor: true });
            return node;
        }

        if (node.val.value > Math.min(p, q) && node.val.value < Math.max(p, q)) {
            steps.push({ node, p, q, direction, islowestCommonAncestor: true });
            return node;
        }

        steps.push({ node, p, q, direction });

        const left = lowestCommonAncestor(p, q, node.left, Direction.Left);
        if (left) {
            steps.push({ node, p, q, direction, islowestCommonAncestor: true });
            return left;
        }

        const right = lowestCommonAncestor(p, q, node.right, Direction.Right);
        if (right) {
            steps.push({ node, p, q, direction, islowestCommonAncestor: true });
            return right;
        }

        steps.push({ node, p, q, direction, islowestCommonAncestor: false });
        return undefined;
    };

    lowestCommonAncestor(p, q, root);
    return steps;
}

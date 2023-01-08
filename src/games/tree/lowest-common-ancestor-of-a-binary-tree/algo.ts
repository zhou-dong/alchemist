import TreeNode from "../../../data-structures/tree/node";

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

        steps.push({ node, p, q, direction });

        const left = lowestCommonAncestor(p, q, node.left, Direction.Left);
        const right = lowestCommonAncestor(p, q, node.right, Direction.Right);

        if (left === undefined && right === undefined) {
            steps.push({ node, p, q, direction, islowestCommonAncestor: false });
            return undefined;
        }

        if (left === undefined) {
            steps.push({ node, p, q, direction, islowestCommonAncestor: true });
            return right;
        }

        if (right === undefined) {
            steps.push({ node, p, q, direction, islowestCommonAncestor: true });
            return left;
        }

        steps.push({ node, p, q, direction, islowestCommonAncestor: true });
        return node;
    };

    lowestCommonAncestor(p, q, root);
    return steps;
}

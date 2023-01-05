import TreeNode from "../../../data-structures/tree/node";

export enum Direction {
    Left, Right, Back
}

export interface Step {
    node: TreeNode<number>;
    lower: number;
    upper: number;
    isBalanced?: boolean;
}

export function buildSteps(root?: TreeNode<number>): Step[] {
    const steps: Step[] = [];

    function isBST(lower: number, upper: number, node?: TreeNode<number>, isBalanced?: boolean): boolean {
        if (node === undefined) {
            return true;
        }

        if (node.val.value <= lower) {
            steps.push({ node, lower, upper, isBalanced: false });
            return false;
        }

        if (node.val.value >= upper) {
            steps.push({ node, lower, upper, isBalanced: false });
            return false;
        }

        steps.push({ node, lower, upper, isBalanced });

        const isLeftBST = isBST(lower, node.val.value, node.left, isBalanced);
        if (!isLeftBST) {
            steps.push({ node, lower, upper, isBalanced: false });
            return false;
        }

        const isRightBST = isBST(node.val.value, upper, node.right, isBalanced);
        if (!isRightBST) {
            steps.push({ node, lower, upper, isBalanced: false });
            return false;
        }

        steps.push({ node, lower, upper, isBalanced: true });
        return true;
    }

    isBST(-Infinity, Infinity, root, undefined);
    return steps;
}

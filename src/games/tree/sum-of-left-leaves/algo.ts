import TreeNode from "../../../data-structures/tree/node";

export enum Direction {
    Left, Right, Back
}

export interface Step {
    node?: TreeNode<number>;
    sum: number;
    isLeftLeafNode: boolean;
}

function isLeafNode(node: TreeNode<number>) {
    return !node.left && !node.right;
}

export function buildSteps(root?: TreeNode<number>): Step[] {
    const steps: Step[] = [];

    let sum = 0;
    function sumOfLeftLeaves(node?: TreeNode<number>) {
        if (!node) {
            return;
        }

        if (node.left && isLeafNode(node.left)) {
            sum += node.left.val.value;
            steps.push({ node, sum, isLeftLeafNode: true });
        } else {
            steps.push({ node, sum, isLeftLeafNode: false });
        }

        sumOfLeftLeaves(node.left);
        sumOfLeftLeaves(node.right);
    }

    sumOfLeftLeaves(root);
    return steps;
}

import TreeNode from "../../../data-structures/tree/nodes/v1/node";

export enum Direction {
    Left, Right, Back
}

export interface Step {
    node: TreeNode<number>;
    sum: number;
    isLeaf: boolean;
    total: number;
    leaves: number[];
}

function isLeaf(node: TreeNode<number>) {
    return !node.left && !node.right;
}

export function buildSteps(root?: TreeNode<number>): Step[] {

    const steps: Step[] = [];

    let total = 0;
    const leaves: number[] = [];
    function sumNumbers(node: TreeNode<number> | undefined, num: number) {
        if (!node) {
            return;
        }

        const sum = num * 10 + node.val.value;
        if (isLeaf(node)) {
            total += sum;
            leaves.push(sum);
            steps.push({ node, sum, total, isLeaf: true, leaves: [...leaves] });
            return;
        }

        steps.push({ node, sum, total, isLeaf: false, leaves: [...leaves] });

        sumNumbers(node.left, sum)
        sumNumbers(node.right, sum);
    }

    sumNumbers(root, 0);
    return steps;
}

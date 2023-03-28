import TreeNode from "../../../data-structures/tree/nodes/v1/node";

export enum Direction {
    Left, Right, Back
}

export interface Step {
    node: TreeNode<number>;
    paths: string[];
}

function isLeafNode(node: TreeNode<number>) {
    return !node.left && !node.right;
}

export function buildSteps(root?: TreeNode<number>): Step[] {
    const steps: Step[] = [];

    let paths: string[] = [];

    function binaryTreePaths(node: TreeNode<number> | undefined, parents: number[]) {
        if (!node) {
            return;
        }

        const path = [...parents, node.val.value];
        if (isLeafNode(node)) {
            paths.push(path.join("->"));
            steps.push({ node, paths: [...paths] });
            return;
        }

        steps.push({ node, paths: [...paths] });
        binaryTreePaths(node.left, path);
        binaryTreePaths(node.right, path);
    }

    binaryTreePaths(root, []);
    return steps;
}

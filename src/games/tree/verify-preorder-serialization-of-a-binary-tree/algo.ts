import TreeNode from "../../../data-structures/tree/nodes/v1/node";

export interface Step {
    node: TreeNode<string>;
}

export function buildSteps(root?: TreeNode<string>): Step[] {
    const steps: Step[] = [];

    function preorder(node?: TreeNode<string>) {
        if (!node) {
            return;
        }
        steps.push({ node });
        preorder(node.left);
        preorder(node.right);
    }

    preorder(root);
    return steps;
}

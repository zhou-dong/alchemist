import TreeNode from "../../../data-structures/tree/nodes/v1/node";

export interface Step {
    prev?: TreeNode<number>;
    node: TreeNode<number>;
    errorOne?: TreeNode<number>;
    errorTwo?: TreeNode<number>;
}

export function buildSteps(root?: TreeNode<number>): Step[] {
    const steps: Step[] = [];

    let errorOne: TreeNode<number> | undefined = undefined;
    let errorTwo: TreeNode<number> | undefined = undefined;
    let prev: TreeNode<number> | undefined = undefined;

    const inorder = (node?: TreeNode<number>) => {
        if (!node) {
            return;
        }

        inorder(node.left);
        if (prev && prev.val.value >= node.val.value) {
            if (!errorOne) {
                errorOne = prev;
            }
            if (errorOne) {
                errorTwo = node;
            }
        }

        steps.push({ prev, node, errorOne, errorTwo })

        prev = node;
        inorder(node.right);
    }

    inorder(root);

    return steps;
}

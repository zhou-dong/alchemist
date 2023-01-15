import TreeNode from "../../../data-structures/tree/node";

export enum Direction {
    Left, Right, Back
}

export enum Action {
    Push, Pop
}

export interface Step {
    node: TreeNode<string>;
    stack: TreeNode<string>[];
    level: number;
    action: Action;
}

export function buildSteps(root?: TreeNode<string>): Step[] {
    const steps: Step[] = [];

    let level = 0;
    function levelOrder(root?: TreeNode<string>): string[][] {
        const result: string[][] = [];
        if (!root) {
            return result;
        }

        const stack: TreeNode<string>[] = [];
        stack.push(root);

        steps.push({ node: root, stack: [...stack], action: Action.Push, level });

        while (stack.length !== 0) {
            const values: string[] = [];
            const length = stack.length;
            level += 1;
            for (let i = 0; i < length; i++) {
                const node = stack.shift()!;

                steps.push({ node, stack: [...stack], action: Action.Pop, level });

                values.push(node.val.value);
                if (node.left) {
                    stack.push(node.left);

                    steps.push({ node: node.left, stack: [...stack], action: Action.Push, level });
                }
                if (node.right) {
                    stack.push(node.right);

                    steps.push({ node: node.right, stack: [...stack], action: Action.Push, level });
                }
            }
            result.push(values);
        }

        return result;
    };

    levelOrder(root);
    return steps;
}

import TreeNode from "../../../data-structures/tree/node";

export enum Direction {
    Left, Right, Back
}

export enum Action {
    Push, Pop
}

export interface Step {
    node: TreeNode<string>;
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

        const queue: TreeNode<string>[] = [];
        queue.push(root);
        steps.push({ node: root, action: Action.Push, level });

        while (queue.length !== 0) {
            const values: string[] = [];
            const length = queue.length;
            for (let i = 0; i < length; i++) {
                const node = queue.shift()!;
                steps.push({ node, action: Action.Pop, level });
                values.push(node.val.value);
                if (node.left) {
                    queue.push(node.left);
                    steps.push({ node: node.left, action: Action.Push, level });
                }
                if (node.right) {
                    queue.push(node.right);
                    steps.push({ node: node.right, action: Action.Push, level });
                }
            }
            level += 1;
            result.push(values);
        }

        return result;
    };

    levelOrder(root);
    return steps;
}

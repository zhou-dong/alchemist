import TreeNode from "../../../../data-structures/tree/node";

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
    result: string[][];
}

function cloneResult(result: string[][]): string[][] {
    return result.map(level => [...level]);
}

export function buildSteps(root?: TreeNode<string>): Step[] {
    const steps: Step[] = [];


    function levelOrder(root?: TreeNode<string>): string[][] {
        const result: string[][] = [];
        if (!root) {
            return result;
        }

        let level = 0;
        let reverse = false;
        const queue: TreeNode<string>[] = [];
        queue.push(root);
        steps.push({ node: root, action: Action.Push, level, result: cloneResult(result) });

        while (queue.length !== 0) {
            const values: string[] = [];
            result.push(values);
            const length = queue.length;
            for (let i = 0; i < length; i++) {
                const node = queue.shift()!;

                if (reverse) {
                    values.unshift(node.val.value);
                } else {
                    values.push(node.val.value);
                }

                steps.push({ node, action: Action.Pop, level, result: cloneResult(result) });
                if (node.left) {
                    queue.push(node.left);
                    steps.push({ node: node.left, action: Action.Push, level, result: cloneResult(result) });
                }
                if (node.right) {
                    queue.push(node.right);
                    steps.push({ node: node.right, action: Action.Push, level, result: cloneResult(result) });
                }
            }
            reverse = !reverse
            level += 1;
        }

        return result;
    };

    levelOrder(root);
    return steps;
}

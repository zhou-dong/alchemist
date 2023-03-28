import TreeNode from "../../../../data-structures/tree/nodes/v1/node";

export interface Step {
    node: TreeNode<string>;
    result: string[][];
}

function cloneResult(result: string[][]): string[][] {
    return result.map(level => [...level]).reverse();
}

export function buildSteps(root?: TreeNode<string>): Step[] {
    const steps: Step[] = [];
    const result: string[][] = [];

    function dfs(node: TreeNode<string> | undefined, level: number) {
        if (!node) {
            return;
        }
        if (result.length === level) {
            result.push([]);
        }

        result[level].push(node.val.value);
        steps.push({ node, result: cloneResult(result) });
        dfs(node.left, level + 1);
        dfs(node.right, level + 1);
    }

    dfs(root, 0);
    return steps;
}

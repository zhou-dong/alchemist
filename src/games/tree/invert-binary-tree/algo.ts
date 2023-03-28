import TreeNode from "../../../data-structures/tree/nodes/v1/node";

interface Node {
    index: number;
    left?: Node;
    right?: Node;
}

export enum Direction {
    Left, Right, Back
}

export interface Step {
    node: Node;
}

const buildTree = (node?: TreeNode<string>): Node | undefined => {
    if (!node) {
        return undefined;
    }
    const root: Node = { index: node.index };
    const left = buildTree(node.left);
    const right = buildTree(node.right);
    root.left = left;
    root.right = right;
    return root;
}

export function buildTreeNodeMap(root?: TreeNode<string>): Map<number, TreeNode<string>> {
    const map: Map<number, TreeNode<string>> = new Map();

    function dfs(node?: TreeNode<string>) {
        if (!node) {
            return;
        }
        map.set(node.index, node);
        dfs(node.left);
        dfs(node.right);
    }

    dfs(root);
    return map;
}

export function buildSteps(root?: TreeNode<string>): Step[] {

    const steps: Step[] = [];

    function invertTree(node?: Node) {
        if (!node) {
            return;
        }

        steps.push({ node });
        const temp = node.left;
        node.left = node.right;
        node.right = temp;

        invertTree(node.left);
        invertTree(node.right);
    };

    const node = buildTree(root);
    invertTree(node);
    return steps;
}

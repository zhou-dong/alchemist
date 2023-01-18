import TreeNode from "../../../data-structures/tree/node";

interface Node {
    index: number;
    left?: Node;
    right?: Node;
}

export enum Action {
    FindRight, Flatten, Display
}

export enum Direction {
    Left, Right, Back
}

export interface Step {
    node: Node;
    next?: Node;
    action: Action;
}

const buildTree = (node?: TreeNode<string>): Node | undefined => {
    if (!node) {
        return undefined;
    }
    const root: Node = { index: node.index };
    root.left = buildTree(node.left);
    root.right = buildTree(node.right);
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

    function flatten(node?: Node): void {
        if (!node) {
            return;
        }

        steps.push({ node, action: Action.Display });

        if (node.left) {
            const next = findRight(node, node.left);

            steps.push({ node, next, action: Action.Flatten });

            next.right = node.right;
            node.right = node.left;
            node.left = undefined;
        }
        flatten(node.right);
    };

    function findRight(root: Node, node: Node): Node {
        steps.push({ node: root, next: node, action: Action.FindRight });
        if (!node.right) {
            return node;
        }
        return findRight(root, node.right);
    };

    const node = buildTree(root);
    flatten(node);
    return steps;
}

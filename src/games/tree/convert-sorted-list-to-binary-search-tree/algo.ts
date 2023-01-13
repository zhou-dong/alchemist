import { buildPerfectBinaryTree } from "../../../data-structures/tree/perfectBinaryTree";
import { xAxisAlpha } from "./styles";

export enum Direction {
    Left, Right, Back
}

interface Node {
    index: number;
    value: string;
    left?: Node;
    right?: Node;
}

export interface InputOutput {
    input: string[];
    steps: Step[];
    xAxis: number[];
}

export interface Step {
    node: Node;
    left: number;
    mid: number;
    right: number;
    direction?: Direction;
}

const calDepth = (root?: Node): number => {
    if (root === undefined) return 0;
    const left = calDepth(root.left);
    const right = calDepth(root.right);
    return Math.max(right, left) + 1;
}

export function buildSteps(input: string[]): InputOutput {
    const steps: Step[] = [];

    function buildTree(values: string[], left: number, right: number, index: number, direction?: Direction): Node | undefined {
        if (left > right) {
            return undefined;
        }

        const mid = ~~((left + right) / 2);
        const node: Node = { index, value: values[mid] };

        steps.push({ node, left, mid, right, direction });

        node.left = buildTree(values, left, mid - 1, 2 * index + 1, Direction.Left);
        node.right = buildTree(values, mid + 1, right, 2 * index + 2, Direction.Right);
        return node;
    };

    const root = buildTree(input, 0, input.length - 1, 0);
    const depth: number = calDepth(root);
    const xAxis: number[] = buildPerfectBinaryTree(depth, xAxisAlpha).map(node => node.x);

    return { input, steps, xAxis };
}

import { buildPerfectBinaryTree } from "../../../data-structures/tree/nodes/utils/perfect-binary-tree";
import { xAxisAlpha } from "./styles";

export enum Direction {
    Left, Right, Back
}

interface Node {
    index: number;
    value: number;
    left?: Node;
    right?: Node;
}

export interface InputOutput {
    input: number[];
    steps: Step[];
    xAxis: number[];
}

export interface Step {
    node?: Node;
    mid?: number;
    slow?: number;
    fast?: number;
    direction?: Direction;
}

const calDepth = (root?: Node): number => {
    if (root === undefined) return 0;
    const left = calDepth(root.left);
    const right = calDepth(root.right);
    return Math.max(right, left) + 1;
}

export function buildSteps(input: number[]): InputOutput {
    const steps: Step[] = [];

    function sortedListToBST(): Node | undefined {

        function preorder(left: number, right: number, index: number, direction?: Direction): Node | undefined {
            if (left === right) {
                return undefined;
            }
            const mid = findMedian(left, right);
            const node: Node = { index, value: input[mid] };

            steps.push({ node, mid, direction });

            node.left = preorder(left, mid, 2 * index + 1, Direction.Left);
            node.right = preorder(mid + 1, right, 2 * index + 2, Direction.Right);
            return node;
        }

        function findMedian(left: number, right: number): number {
            let slow = left;
            let fast = left;
            steps.push({ slow, fast, });
            while (fast !== right && (fast + 1) !== right) {
                fast = fast + 1;
                fast = fast + 1;
                slow = slow + 1;
                steps.push({ slow, fast, });
            }
            return slow;
        }

        return preorder(0, input.length, 0);
    };

    const root = sortedListToBST();
    const depth: number = calDepth(root);
    const xAxis: number[] = buildPerfectBinaryTree(depth, xAxisAlpha, 2).map(node => node.x);

    return { input, steps, xAxis };
}

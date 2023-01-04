export enum Direction {
    Left, Right, Back
}

interface Node {
    index: number;
    value: string;
    left?: Node;
    right?: Node;
}

export interface Step {
    node: Node;
    left: number;
    mid: number;
    right: number;
    direction?: Direction;
}

export function buildSteps<T>(input: string[]): Step[] {
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

    buildTree(input, 0, input.length - 1, 0);
    return steps;
}

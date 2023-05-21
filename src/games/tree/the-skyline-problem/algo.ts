import { Line, Edge, Building, Step, Action } from "./AlgoContext";

class MaxHeap {
    private heights: number[];
    private lazyDelete: Map<number, number>;

    constructor() {
        this.heights = [];
        this.lazyDelete = new Map();
    }

    peek() {
        this.prune();
        return this.heights[0];
    }

    push(height: number) {
        this.heights.push(height);
        this.bubbleUp(this.heights.length - 1);
    }

    delete(height: number) {
        const top = this.heights[0];
        if (top !== undefined && top === height) {
            this.pop();
        } else {
            const count = this.lazyDelete.get(height) || 0;
            this.lazyDelete.set(height, count + 1);
        }
    }

    private pop() {
        const root = this.heights.shift();
        const last = this.heights.pop();
        if (last !== undefined) {
            this.heights.unshift(last);
            this.bubbleDown(0);
        }
        return root;
    }

    private prune() {
        let top = this.heights[0];
        while (top !== undefined && this.lazyDelete.has(top)) {
            this.pop();
            const count = this.lazyDelete.get(top) || 0;
            if (count === 1) {
                this.lazyDelete.delete(top);
            } else {
                this.lazyDelete.set(top, count - 1);
            }
            top = this.heights[0];
        }
    }

    private bubbleUp(index: number) {
        if (index < 1) {
            return;
        }

        const parentIndex = Math.floor((index - 1) / 2);
        if (this.heights[index] > this.heights[parentIndex]) {
            this.swap(index, parentIndex);
            this.bubbleUp(parentIndex);
        }
    }

    private bubbleDown(index: number) {
        let target = index;

        const leftChildIndex = 2 * index + 1;
        if (this.shouldBubbleDown(target, leftChildIndex)) {
            target = leftChildIndex;
        }

        const rightChildIndex = 2 * index + 2;
        if (this.shouldBubbleDown(target, rightChildIndex)) {
            target = rightChildIndex;
        }

        if (target !== index) {
            this.swap(index, target);
            this.bubbleDown(target);
        }
    }

    private shouldBubbleDown(index: number, childIndex: number): boolean {
        const current = this.heights[index];
        const child = this.heights[childIndex];
        return (current === undefined || child === undefined) ? false : current < child;
    }

    private swap(i: number, j: number) {
        [this.heights[i], this.heights[j]] = [this.heights[j], this.heights[i]];
    }
}

export const compareFn = (a: Line, b: Line): number => {
    if (a.x !== b.x) {
        return a.x - b.x;
    }

    // if two starts are compared then higher building should be picked first
    if (a.edge === Edge.Start && b.edge === Edge.Start) {
        return b.height - a.height;
    }

    // if two ends are compared then lower building should be picked first
    if (a.edge === Edge.End && b.edge === Edge.End) {
        return a.height - b.height;
    }

    // if one start and one end are compared then start should be picked first
    return (a.edge === Edge.Start) ? -1 : 1;
};

export const buildLines = (buildings: Building[]): Line[] => {

    return buildings.flatMap(building => {
        const { left, right, height } = building;
        const leftLine = { x: left, height, edge: Edge.Start };
        const rightLine = { x: right, height, edge: Edge.End };
        return [leftLine, rightLine];
    });
}

export const buildSteps = (lines: Line[]): Step[] => {

    let prevHeight = 0;
    const result: number[][] = [];
    const heap = new MaxHeap();

    const steps: Step[] = [];

    lines.forEach(line => {
        const { x, height, edge } = line;

        if (edge === Edge.Start) {
            heap.push(height);
            steps.push({ prevHeight, action: Action.PushToHeap, height });
        } else {
            heap.delete(height);
            steps.push({ prevHeight, action: Action.DeleteFromHeap, height });
        }

        const peek = heap.peek() || 0;
        if (prevHeight !== peek) {
            result.push([x, peek]);
            steps.push({ prevHeight, action: Action.PushToSkyline, x, height });
            prevHeight = peek;
        }
    });

    return steps;
}

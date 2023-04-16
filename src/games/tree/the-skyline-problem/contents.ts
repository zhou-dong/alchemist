export const title = "The Skyline Problem";

export const MaxHeap = `enum Edge {
    Start, End
}

type Item = {
    x: number;
    height: number;
    edge: Edge;
}

class MaxHeap {
    private heights: number[];
    private map: Map<number, number[]>;

    constructor() {
        this.heights = [];
        this.map = new Map();
    }

    peek() {
        return this.heights[0];
    }

    push(height: number) {
        this.heights.push(height);
        this.addIndex(height, this.heights.length - 1);
        this.bubbleUp(this.heights.length - 1);
    }

    delete(height: number) {
        // check whether height in the heap
        const indices = this.map.get(height) || [];
        if (indices.length === 0) {
            return;
        }

        // find the height index
        const index = indices.pop();

        // remove last from heap
        const lastIndex = this.heights.length - 1;
        const last = this.heights.pop();
        this.deleteIndex(last, lastIndex);

        // check whether height is the last element in heap
        if (index === lastIndex) {
            return;
        }

        // delete height from index
        this.heights.splice(index, 1)[0];
        this.deleteIndex(height, index);

        // add last to index
        this.heights.splice(index, 0, last);
        this.addIndex(last, index);

        // heapify
        this.heapify();
    }

    heapify() {
        for (let i = Math.floor(this.heights.length / 2) - 1; i >= 0; i--) {
            this.bubbleDown(i);
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

    private addIndex(height: number, index: number) {
        if (!this.map.has(height)) {
            this.map.set(height, []);
        }
        this.map.get(height).push(index);
    }

    private deleteIndex(height: number | undefined, index: number) {
        if (height === undefined) {
            return;
        }

        const indices = this.map.get(height) || [];
        const target = indices.indexOf(index);
        if (target > -1) {
            indices.splice(target, 1);
        }
    }

    private updateIndex(item: number, from: number, to: number) {
        this.deleteIndex(item, from);
        this.addIndex(item, to);
    }

    private swap(i: number, j: number) {
        this.updateIndex(this.heights[i], i, j);
        this.updateIndex(this.heights[j], j, i);
        [this.heights[i], this.heights[j]] = [this.heights[j], this.heights[i]];
    }
}`;

export const getSkyline = `function getSkyline(buildings: number[][]): number[][] {
    const items: Item[] = [];

    buildings.forEach(building => {
        const [start, end, height] = building;
        items.push({ x: start, height, edge: Edge.Start });
        items.push({ x: end, height, edge: Edge.End });
    });

    const compareFn = (a: Item, b: Item): number => {
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

    items.sort(compareFn);

    let prevMaxHeight = 0;
    const result: number[][] = [];
    const heap = new MaxHeap();

    items.forEach(item => {
        const { x, height, edge } = item;
        if (edge === Edge.Start) {
            heap.push(height);
        } else {
            heap.delete(height);
        }

        const peek = heap.peek() || 0;
        if (prevMaxHeight !== peek) {
            result.push([x, peek]);
            prevMaxHeight = peek;
        }
    });

    return result;
};`;

export const description = `
A city's **skyline** is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. 
Given the locations and heights of all the buildings, return the ***skyline*** formed by these buildings collectively.

The geometric information of each building is given in the array **buildings** where ***buildings[i] = [left, right, height]***:

- left is the x coordinate of the left edge of the i^th building.
- right is the x coordinate of the right edge of the i^th building.
- height is the height of the i^th building.

You may assume all buildings are perfect rectangles grounded on an absolutely flat surface at height 0.

The **kyline** should be represented as a list of "key points" **sorted by their x-coordinate** in the form [[x1,y1],[x2,y2],...]. 
Each key point is the left endpoint of some horizontal segment in the skyline except the last point in the list, 
which always has a y-coordinate 0 and is used to mark the skyline's termination where the rightmost building ends. 
Any ground between the leftmost and rightmost buildings should be part of the skyline's contour.

Note: There must be no consecutive horizontal lines of equal height in the output skyline.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

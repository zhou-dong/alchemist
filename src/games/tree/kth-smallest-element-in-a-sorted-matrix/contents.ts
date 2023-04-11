export const title = "Kth Smallest Element in a Sorted Matrix";


export const minHeap = `type Item = {
    val: number;
    row: number;
    col: number;
}

class MinHeap {
    private items: Item[];

    constructor() {
        this.items = [];
    }

    push(item: Item) {
        this.items.push(item);
        this.bubbleUp(this.items.length - 1);
    }

    pop() {
        const root = this.items.shift();
        const last = this.items.pop();
        if (last) {
            this.items.unshift(last);
            this.bubbleDown(0);
        }
        return root;
    }

    private bubbleDown(index: number) {
        let target = index;

        const leftChildIndex = 2 * index + 1;
        if (
            this.items[target] &&
            this.items[leftChildIndex] &&
            this.items[target].val > this.items[leftChildIndex].val
        ) {
            target = leftChildIndex;
        }

        const rightChildIndex = 2 * index + 2;
        if (
            this.items[target] &&
            this.items[rightChildIndex] &&
            this.items[target].val > this.items[rightChildIndex].val
        ) {
            target = rightChildIndex;
        }

        if (target !== index) {
            this.swap(index, target);
            this.bubbleDown(target);
        }
    }

    private bubbleUp(index: number) {
        if (index < 1) {
            return;
        }
        const parentIndex = Math.floor((index - 1) / 2);
        if (this.items[index].val < this.items[parentIndex].val) {
            this.swap(index, parentIndex);
            this.bubbleUp(parentIndex);
        }
    }

    private swap(i: number, j: number) {
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
}`;

export const kthSmallest = `function kthSmallest(matrix: number[][], k: number): number {

    const minHeap = new MinHeap();

    matrix.forEach((row, i) => {
        minHeap.push({ val: row[0], row: i, col: 0 });
    });

    for (let i = 0; i < k - 1; i++) {
        const { row, col } = minHeap.pop();
        if (col + 1 < matrix[row].length) {
            minHeap.push({ val: matrix[row][col + 1], row, col: col + 1 })
        }
    }

    return minHeap.pop().val;
};`;

export const description = `
Given an **n x n** matrix where each of the rows and columns is sorted in ascending order, return the **kth** smallest element in the matrix.

Note that it is the **kth** smallest element **in the sorted order**, **not** the kth **distinct** element.

You must find a solution with a memory complexity better than O(n^2).
`;

export const solution = ``;

export const usecases = '';

export const example = `
`;

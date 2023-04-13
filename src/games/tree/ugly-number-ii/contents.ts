export const title = "Ugly Number II";

export const minHeap = `class MinHeap {
    private items: number[];

    constructor() {
        this.items = [];
    }

    push(num: number) {
        this.items.push(num);
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

    private bubbleUp(index: number) {
        if (index < 1) {
            return;
        }

        const parentIndex = Math.floor((index - 1) / 2);
        if (this.items[index] < this.items[parentIndex]) {
            this.swap(index, parentIndex);
            this.bubbleUp(parentIndex);
        }
    }

    private bubbleDown(index: number) {
        let target = index;

        const leftChildIndex = 2 * index + 1;
        if (
            this.items[target] !== undefined &&
            this.items[leftChildIndex] !== undefined &&
            this.items[target] > this.items[leftChildIndex]
        ) {
            target = leftChildIndex;
        }

        const rightChildIndex = 2 * index + 2;
        if (
            this.items[target] !== undefined &&
            this.items[rightChildIndex] !== undefined &&
            this.items[target] > this.items[rightChildIndex]
        ) {
            target = rightChildIndex;
        }

        if (target !== index) {
            this.swap(index, target);
            this.bubbleDown(target);
        }
    }

    private swap(i: number, j: number) {
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
}`;

export const nthUglyNumber = `function nthUglyNumber(n: number): number {

    const factors = [2, 3, 5];
    const minHeap = new MinHeap();
    const seen = new Set();

    minHeap.push(1);
    for (let i = 0; i < n - 1; i++) {
        const root = minHeap.pop();
        for (const factor of factors) {
            const next = root * factor;
            if (!seen.has(next)) {
                minHeap.push(next);
                seen.add(next);
            }
        }
    }

    return minHeap.pop();
};`;

export const description = `
An **ugly number** is a positive integer whose prime factors are limited to **2**, **3**, and **5**.

Given an integer n, return the **n^th** ugly number.
`;

export const solution = ``;

export const usecases = '';

export const example = `
`;

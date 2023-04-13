export const title = "Find K Pairs with Smallest Sums";

export const minHeap = `interface HeapItem {
    val: number;

    x: number; // index in nums1
    y: number; // index in nums2

    a: number; // value in nums1
    b: number; // value in nums2
}

class MinHeap {
    private items: HeapItem[];

    constructor() {
        this.items = [];
    }

    push(item: HeapItem) {
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
            this.swap(target, index);
            this.bubbleDown(target);
        }
    }

    private swap(i: number, j: number) {
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
};`;

export const kSmallestPairs = `function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {

    const set: Set<string> = new Set();
    const result: number[][] = [];
    const minHeap = new MinHeap();

    const buildSetKey = (x: number, y: number): string => {
        return x + "," + y;
    }

    const pushToMinHeap = (x: number, y: number) => {
        const a = nums1[x];
        const b = nums2[y];
        minHeap.push({ val: a + b, a, b, x, y });
    }

    pushToMinHeap(0, 0);
    for (let i = 0; i < k; i++) {
        const root = minHeap.pop();
        if (root) {
            const { x, y, a, b } = root;
            result.push([a, b]);
            if (x + 1 < nums1.length) {
                const key = buildSetKey(x + 1, y);
                if (!set.has(key)) {
                    pushToMinHeap(x + 1, y);
                    set.add(key);
                }
            }
            if (y + 1 < nums2.length) {
                const key = buildSetKey(x, y + 1);
                if (!set.has(key)) {
                    pushToMinHeap(x, y + 1);
                    set.add(key);
                }
            }
        }
    }

    return result;
};`;

export const description = `
You are given two integer arrays **nums1** and **nums2** sorted in **ascending order** and an integer **k**.

Define a pair **(u, v)** which consists of one element from the first array and one element from the second array.

Return the **k** pairs **(u1, v1), (u2, v2), ..., (uk, vk)** with the smallest sums.
`;

export const solution = ``;

export const usecases = '';

export const example = `
`;

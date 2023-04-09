export const title = "Top K Frequent Elements";

export const formula = `function topKFrequent(nums: number[], k: number): number[] {

    type HeapItem = {
        num: number;
        count: number;
    }

    class MinHeap {
        items: HeapItem[];

        constructor() {
            this.items = [];
        }

        peek() {
            return this.items[0];
        }

        delete() {
            const root = this.items.shift();
            const last = this.items.pop();
            if (last !== undefined) {
                this.items.unshift(last);
            }
            this.bubbleDown(0);
            return root;
        }

        push(num: number, count: number) {
            this.items.push({ num, count });
            this.bubbleUp(this.items.length - 1);
        }

        size() {
            return this.items.length;
        }

        private bubbleDown(index: number) {
            let target = index;

            const leftIndex = 2 * index + 1;
            if (this.items[target] !== undefined &&
                this.items[leftIndex] !== undefined &&
                this.items[target].count > this.items[leftIndex].count
            ) {
                target = leftIndex;
            }

            const rightIndex = 2 * index + 2;
            if (this.items[target] !== undefined &&
                this.items[rightIndex] !== undefined &&
                this.items[target].count > this.items[rightIndex].count
            ) {
                target = rightIndex;
            }

            if (target === index) {
                return;
            }

            this.swap(target, index);
            this.bubbleDown(target);
        }

        private bubbleUp(index: number) {
            if (index < 1) {
                return;
            }
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.items[index].count < this.items[parentIndex].count) {
                this.swap(parentIndex, index);
                this.bubbleUp(parentIndex);
            }
        }

        private swap(i: number, j: number) {
            [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
        }
    }

    const map: Map<number, number> = new Map();
    nums.forEach(num => {
        const count = map.get(num) || 0;
        map.set(num, count + 1);
    })

    const heap = new MinHeap();
    map.forEach((value, key) => {
        if (heap.size() === k) {
            if (heap.peek().count < value) {
                heap.delete();
                heap.push(key, value);
            }
        } else {
            heap.push(key, value);
        }
    })

    return heap.items.map(item => item.num);
};`;

export const description = `
Given an integer array **nums** and an integer **k**, return the **k** most frequent elements. You may return the answer in **any order**.
`;

export const solution = ``;

export const usecases = '';

export const example = `
---

**Example 1**:

- Input: nums = [3,3,3,1,1,2,2,2,3], k = 2
- Output: [3,2]

**Example 2**:

- Input: nums = [5], k = 1
- Output: [5]
`;

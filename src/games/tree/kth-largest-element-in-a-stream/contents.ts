export const title = "Kth Largest Element in a Stream";

export const minHeap = `class MinHeap {
    private items: number[];

    constructor() {
        this.items = [];
    }

    push(item: number) {
        this.items.push(item);
        this.bubbleUp(this.items.length - 1);
    }

    pop() {
        const root = this.items.shift();
        const last = this.items.pop();
        if (last !== undefined) {
            this.items.unshift(last);
            this.bubbleDown(0)
        }
        return root;
    }

    size() {
        return this.items.length;
    }

    peek() {
        return this.items[0];
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
        if (this.shouldBubbleDown(target, leftChildIndex)) {
            target = leftChildIndex;
        }

        const rightChildIndex = 2 * index + 2;
        if (this.shouldBubbleDown(target, rightChildIndex)) {
            target = rightChildIndex;
        }

        if (target !== index) {
            this.swap(target, index);
            this.bubbleDown(target);
        }
    }

    private shouldBubbleDown(index: number, childIndex: number): boolean {
        const current = this.items[index];
        const child = this.items[childIndex];
        if (current === undefined || child === undefined) {
            return false;
        }
        return current > child;
    }

    private swap(i: number, j: number) {
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
}`;

export const KthLargest = `class KthLargest {
    private k: number;
    private minHeap: MinHeap;

    constructor(k: number, nums: number[]) {
        this.k = k;
        this.minHeap = new MinHeap();
        nums.forEach(num => {
            this.add(num);
        });
    }

    add(val: number): number {
        this.minHeap.push(val);
        if (this.minHeap.size() > this.k) {
            this.minHeap.pop();
        }
        return this.minHeap.peek();
    }
}`;

export const description = `
Design a class to find the **k^th** largest element in a stream. Note that it is the **k^th** largest element in the sorted order, not the **k^th** distinct element.

Implement **KthLargest** class:

- **KthLargest(int k, int[] nums)** Initializes the object with the integer **k** and the stream of integers **nums**.
- **int add(int val)** Appends the integer **val** to the stream and returns the element representing the **k^th** largest element in the stream.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;





/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
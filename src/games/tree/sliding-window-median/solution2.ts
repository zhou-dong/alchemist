export const indexDeletedSolution = `
abstract class Heap {

    private indices: Map<number, number[]>;
    protected items: number[];

    constructor() {
        this.indices = new Map();
        this.items = [];
    }

    heapify() {
        for (let i = Math.floor(this.items.length / 2) - 1; i >= 0; i--) {
            this.bubbleDown(i);
        }
    }

    size() {
        return this.items.length;
    }

    peek() {
        return this.items[0];
    }

    push(item: number) {
        this.items.push(item);
        this.addIndex(item, this.items.length - 1);
        this.bubbleUp(this.items.length - 1);
    }

    pop() {
        const lastIndex = this.items.length - 1;
        const root = this.items.shift();
        this.deleteIndex(root, 0);
        const last = this.items.pop();
        this.deleteIndex(last, lastIndex);
        if (last !== undefined) {
            this.items.unshift(last);
            this.addIndex(last, 0);
            this.bubbleDown(0);
        }
        return root;
    }

    delete(item: number): number | undefined {
        const values: number[] = this.indices.get(item) || [];

        const index = values.pop();
        if (index === undefined) {
            return undefined;
        }

        const lastIndex = this.items.length - 1;
        const last = this.items.pop();
        this.deleteIndex(last, lastIndex);
        if (index === lastIndex) {
            return last;
        }

        const target = this.items.splice(index, 1)[0];
        this.deleteIndex(target, index);

        if (last !== undefined) {
            this.items.splice(index, 0, last);
            this.addIndex(last, index);
            this.heapify();
        }
        return target;
    }

    private bubbleUp(index: number) {
        if (index < 1) {
            return;
        }

        const parentIndex = Math.floor((index - 1) / 2);
        if (this.shouldBubbleUp(index, parentIndex)) {
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

    private swap(i: number, j: number) {
        this.updateIndex(this.items[i], i, j);
        this.updateIndex(this.items[j], j, i);
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }

    private addIndex(item: number, index: number) {
        const values: number[] = this.indices.get(item) || [];
        values.push(index);
        this.indices.set(item, values);
    }

    private deleteIndex(item: number | undefined, index: number) {
        if (item === undefined) {
            return;
        }

        const values: number[] = this.indices.get(item) || [];
        const target = values.indexOf(index);
        if (target > -1) {
            values.splice(target, 1);
        }
    }

    private updateIndex(item: number, from: number, to: number) {
        this.deleteIndex(item, from);
        this.addIndex(item, to);
    }

    protected abstract shouldBubbleUp(index: number, parentIndex: number): boolean;
    protected abstract shouldBubbleDown(index: number, childIndex: number): boolean;
}

class MinHeap extends Heap {

    protected shouldBubbleUp(index: number, parentIndex: number) {
        return this.items[index] < this.items[parentIndex];
    }

    protected shouldBubbleDown(index: number, childIndex: number) {
        return this.items[index] > this.items[childIndex];
    }
}

class MaxHeap extends Heap {

    protected shouldBubbleUp(index: number, parentIndex: number) {
        return this.items[index] > this.items[parentIndex];
    }

    protected shouldBubbleDown(index: number, childIndex: number) {
        return this.items[index] < this.items[childIndex];
    }
}

class DualHeap {

    smaller: MaxHeap;
    greater: MinHeap;

    constructor() {
        this.smaller = new MaxHeap();
        this.greater = new MinHeap();
    }

    push(item: number) {
        if (this.smaller.size() === 0 || item <= this.smaller.peek()) {
            this.smaller.push(item);
        } else {
            this.greater.push(item);
        }
        this.balance();
    }

    private balance() {
        if (this.smaller.size() > this.greater.size() + 1) {
            const temp = this.smaller.pop();
            this.greater.push(temp);
        } else if (this.greater.size() > this.smaller.size()) {
            const temp = this.greater.pop();
            this.smaller.push(temp);
        }
    }

    delete(item: number) {
        if (this.smaller.delete(item) === undefined) {
            this.greater.delete(item);
        }
        this.balance();
    }

    median() {
        if (this.smaller.size() === this.greater.size()) {
            const one = this.smaller.peek() || 0;
            const two = this.greater.peek() || 0;
            return (one + two) / 2;
        }
        return this.smaller.peek();
    }

}

function medianSlidingWindow(nums: number[], k: number): number[] {
    const heap = new DualHeap();

    let i = 0;
    for (; i < k; i++) {
        heap.push(nums[i]);
    }

    const result: number[] = [];
    for (; i < nums.length; i++) {
        result.push(heap.median());
        heap.delete(nums[i - k]);
        heap.push(nums[i]);
    }

    result.push(heap.median());
    return result;
};`;

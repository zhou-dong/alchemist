export const lazyDeleteSolution = `abstract class Heap {

    protected items: number[];
    private deleted: Map<number, number>;
    private deletedCount: number;

    constructor() {
        this.items = [];
        this.deleted = new Map();
        this.deletedCount = 0;
    }

    size() {
        return this.items.length - this.deletedCount;
    }

    peek() {
        return this.items[0];
    }

    push(item: number) {
        this.items.push(item);
        this.bubbleUp(this.items.length - 1);
    }

    pop() {
        const top = this.deleteTop();
        this.prune();
        return top;
    }

    private deleteTop() {
        const root = this.items.shift();
        const last = this.items.pop();
        if (last !== undefined) {
            this.items.unshift(last);
            this.bubbleDown(0);
        }
        return root;
    }

    private prune() {
        let top = this.peek();
        while (top !== undefined && this.deleted.has(top)) {
            this.deleteTop();
            const count = this.deleted.get(top);
            if (count === 1) {
                this.deleted.delete(top);
            } else {
                this.deleted.set(top, count - 1);
            }
            this.deletedCount -= 1;
            top = this.peek();
        }
    }

    delete(item: number): number | undefined {
        const top = this.peek();
        if (item === top) {
            this.pop();
            return item;
        }
        if (this.items.includes(item)) {
            const count = this.deleted.get(item) || 0;
            this.deleted.set(item, count + 1);
            this.deletedCount += 1;
            return item;
        }
        return undefined;
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
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
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
};`

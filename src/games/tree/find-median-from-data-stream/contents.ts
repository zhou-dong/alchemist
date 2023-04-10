export const title = "Find Median from Data Stream";

export const heap = `abstract class Heap {

    protected items: number[]

    constructor() {
        this.items = [];
    }

    push(num: number) {
        this.items.push(num);
        this.bubbleUp(this.items.length - 1);
    }

    pop() {
        const head = this.items.shift();
        const last = this.items.pop();
        if(last !== undefined) {
            this.items.unshift(last);
        }
        this.bubbleDown(0);
        return head;
    }

    peek() {
        return this.items[0];
    }

    size() {
        return this.items.length;
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

        if (target === index) {
            return;
        }

        this.swap(index, target);
        this.bubbleDown(target);
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

    private swap(i: number, j: number) {
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }

    protected abstract shouldBubbleUp(index: number, parentIndex: number): boolean;
    protected abstract shouldBubbleDown(index: number, childIndex: number): boolean;
}

class MinHeap extends Heap {

    protected  shouldBubbleUp(index: number, parentIndex: number): boolean {
        const current = this.items[index];
        const parent = this.items[parentIndex];
        return current < parent;
    }
    
    protected  shouldBubbleDown(index: number, childIndex: number): boolean {
        const current = this.items[index];
        const child = this.items[childIndex];
        if (current === undefined || child === undefined) {
            return false;
        }
        return current > child;
    }
}

class MaxHeap extends Heap {

    protected  shouldBubbleUp(index: number, parentIndex: number): boolean {
        const current = this.items[index];
        const parent = this.items[parentIndex];
        return current > parent;
    }
    
    protected  shouldBubbleDown(index: number, childIndex: number): boolean {
        const current = this.items[index];
        const child = this.items[childIndex];
        if (current === undefined || child === undefined) {
            return false;
        }
        return current < child;
    }
}`;

export const medianFinder = `class MedianFinder {

    private smaller: MaxHeap;
    private greater: MinHeap; 

    constructor() {
        this.smaller = new MaxHeap();
        this.greater = new MinHeap();
    }

    addNum(num: number): void {
        if (this.smaller.size() === 0 || num <= this.smaller.peek()) {
            this.smaller.push(num);
            if (this.smaller.size() > this.greater.size() + 1) {
                this.greater.push(this.smaller.pop());
            }
        } else {
            this.greater.push(num);
            if (this.greater.size() > this.smaller.size()) {
                this.smaller.push(this.greater.pop());
            }
        }
    }

    findMedian(): number {
        if (this.greater.size() === this.smaller.size()) {
            return (this.greater.peek() + this.smaller.peek() ) / 2;
        } else {
            return this.smaller.peek();
        }
    }
}`;

export const formula = `abstract class Heap {

    protected items: number[]

    constructor() {
        this.items = [];
    }

    push(num: number) {
        this.items.push(num);
        this.bubbleUp(this.items.length - 1);
    }

    pop() {
        const head = this.items.shift();
        const last = this.items.pop();
        if(last !== undefined) {
            this.items.unshift(last);
        }
        this.bubbleDown(0);
        return head;
    }

    peek() {
        return this.items[0];
    }

    size() {
        return this.items.length;
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

        if (target === index) {
            return;
        }

        this.swap(index, target);
        this.bubbleDown(target);
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

    private swap(i: number, j: number) {
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }

    protected abstract shouldBubbleUp(index: number, parentIndex: number): boolean;
    protected abstract shouldBubbleDown(index: number, childIndex: number): boolean;
}

class MinHeap extends Heap {

    protected  shouldBubbleUp(index: number, parentIndex: number): boolean {
        const current = this.items[index];
        const parent = this.items[parentIndex];
        return current < parent;
    }
    
    protected  shouldBubbleDown(index: number, childIndex: number): boolean {
        const current = this.items[index];
        const child = this.items[childIndex];
        if (current === undefined || child === undefined) {
            return false;
        }
        return current > child;
    }
}

class MaxHeap extends Heap {

    protected  shouldBubbleUp(index: number, parentIndex: number): boolean {
        const current = this.items[index];
        const parent = this.items[parentIndex];
        return current > parent;
    }
    
    protected  shouldBubbleDown(index: number, childIndex: number): boolean {
        const current = this.items[index];
        const child = this.items[childIndex];
        if (current === undefined || child === undefined) {
            return false;
        }
        return current < child;
    }
}

class MedianFinder {

    private smaller: MaxHeap;
    private greater: MinHeap; 

    constructor() {
        this.smaller = new MaxHeap();
        this.greater = new MinHeap();
    }

    addNum(num: number): void {
        if (this.smaller.size() === 0 || num <= this.smaller.peek()) {
            this.smaller.push(num);
            if (this.smaller.size() > this.greater.size() + 1) {
                this.greater.push(this.smaller.pop());
            }
        } else {
            this.greater.push(num);
            if (this.greater.size() > this.smaller.size()) {
                this.smaller.push(this.greater.pop());
            }
        }
    }

    findMedian(): number {
        if (this.greater.size() === this.smaller.size()) {
            return (this.greater.peek() + this.smaller.peek() ) / 2;
        } else {
            return this.smaller.peek();
        }
    }
}`;

export const description = `
The median is the middle value in an ordered integer list. 
If the size of the list is even, there is no middle value, 
and the median is the mean of the two middle values.

- For example, for arr = [3, 6, 9], the median is 6.
- For example, for arr = [4, 6], the median is (4 + 6) / 2 = 5.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

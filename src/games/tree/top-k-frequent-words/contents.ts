export const title = "Top K Frequent Words";

export const minHeap = `interface HeapItem {
    word: string;
    count: number;
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

    size() {
        return this.items.length;
    }

    private bubbleUp(index: number) {
        if (index < 1) {
            return;
        }

        const parentIdex = Math.floor((index - 1) / 2);
        if (this.shouldBubbleUp(index, parentIdex)) {
            this.swap(index, parentIdex);
            this.bubbleUp(parentIdex);
        }
    }

    private shouldBubbleUp(index: number, parentIdex: number): boolean {
        const current = this.items[index];
        const parent = this.items[parentIdex];

        return (current.count < parent.count) || (
            current.count === parent.count && current.word > parent.word
        );
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

        if (!current || !child) {
            return false;
        }

        return (current.count > child.count) || (
            current.count === child.count && current.word < child.word
        );
    }

    private swap(i: number, j: number) {
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
}`;

export const topKFrequent = `function topKFrequent(words: string[], k: number): string[] {
    const counts: Map<string, number> = new Map();
    words.forEach(word => {
        const count = counts.get(word) || 0;
        counts.set(word, count + 1);
    });

    const heap = new MinHeap();
    counts.forEach((count, word) => {
        heap.push({ word, count });
        if (heap.size() > k) {
            heap.pop();
        }
    });

    const result: string[] = [];
    while (heap.size() > 0) {
        const { word } = heap.pop();
        result.unshift(word);
    }

    return result;
};`;

export const description = `
Given an array of strings **words** and an integer **k**, return the **k** most frequent strings.

Return the answer **sorted** by the **frequency** from highest to lowest. Sort the words with the same frequency by their **lexicographical order**.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;

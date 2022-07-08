import { Iterator } from './iterator';

export class ArrayIterator<T> implements Iterator<T> {
    private items: T[];
    private current: number;

    constructor(items: T[]) {
        this.items = items;
        this.current = 0;
    }

    hasNext(): boolean {
        return this.current < this.items.length;
    }

    next(): T {
        const result = this.items[this.current];
        this.current += 1;
        return result;
    }
}

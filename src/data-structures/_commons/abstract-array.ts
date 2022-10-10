import { Collection } from './collection';
import { ArrayIterator } from './array-iterator';
import { Iterable } from './iterable';
import { Iterator } from './iterator';

export abstract class AbstractArray<T> implements Collection, Iterable<T> {
    protected elements: T[];

    constructor(elements: T[]) {
        this.elements = elements;
    }

    isEmpty(): Promise<boolean> {
        return Promise.resolve(this.elements.length === 0);
    }

    size(): Promise<number> {
        return Promise.resolve(this.elements.length);
    }

    iterator(): Iterator<T> {
        return new ArrayIterator<T>(this.elements);
    }
}

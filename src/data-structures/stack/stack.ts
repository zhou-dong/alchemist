import { Collection } from '../_commons/collection';

export interface IStack<T> extends Collection {
    push(t: T): Promise<number>;
    pop(): Promise<T | undefined>;
    peek(): Promise<T | undefined>;
}

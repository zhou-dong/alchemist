export interface Iterator<T> {
    hasNext(): boolean;
    next(): T;
}

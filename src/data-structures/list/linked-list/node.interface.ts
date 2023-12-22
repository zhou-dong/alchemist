export interface LinkedListNode<T> {
    data: T;
    next: Promise<LinkedListNode<T>> | undefined;
    prev: Promise<LinkedListNode<T>> | undefined;
}

import { LinkedListNode } from "./node.three";
import { LinkedList as ILinkedList } from "./list.interface";

export class LinkedList<T> implements ILinkedList<LinkedListNode<T>> {
    private _size: number;

    private dummyHead: LinkedListNode<T>;
    private dummyTail: LinkedListNode<T>;

    constructor() {
        this._size = 0;
        this.dummyHead = new LinkedListNode<T>(null as any);
        this.dummyTail = new LinkedListNode<T>(null as any);
        this.dummyHead.next = this.dummyTail;
        this.dummyTail.prev = this.dummyHead;
    }

    get size() {
        return this._size;
    }

    // add to tail
    push(item: LinkedListNode<T>): Promise<number> {
        item.prev = this.dummyTail.prev;
        item.next = this.dummyTail;

        this.dummyTail.prev!.next = item;
        this.dummyTail.prev = item;

        this._size++;
        return Promise.resolve(this.size);
    }

    // remove the last
    pop(): Promise<LinkedListNode<T> | undefined> {
        if (this._size === 0) {
            // todo animate
            return Promise.resolve(undefined);
        }

        const last: LinkedListNode<T> = this.dummyTail.prev!;

        this.dummyTail.prev = last.prev;
        last.prev!.next = this.dummyTail;

        last.prev = undefined;
        last.next = undefined;

        this._size--;
        return Promise.resolve(last);
    }

    // move the first
    shift(): Promise<LinkedListNode<T> | undefined> {
        if (this._size === 0) {
            // todo animate
            return Promise.resolve(undefined);
        }

        const head: LinkedListNode<T> = this.dummyHead.next!;

        this.dummyHead.next = head.next;
        head.next!.prev = this.dummyHead;

        head.prev = undefined;
        head.next = undefined;

        this._size--;

        return Promise.resolve(head);
    }

    // add to head
    unshift(item: LinkedListNode<T>): Promise<number> {
        item.next = this.dummyHead.next;
        item.prev = this.dummyHead;

        this.dummyHead.next!.prev = item;
        this.dummyHead.next = item;

        this._size++;
        return Promise.resolve(this.size);
    }

}

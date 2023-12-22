import { LinkedListNode as ILinkedListNode } from "./node.interface";
import { TextCube } from '../../_commons/cube/three/text-cube';

export class LinkedListNode<T> implements ILinkedListNode<TextCube<T>> {
    data: TextCube<T>;

    private _next?: LinkedListNode<T>;
    private _prev?: LinkedListNode<T>;

    constructor(data: TextCube<T>) {
        this.data = data;
    }

    set next(promise: Promise<LinkedListNode<T>> | undefined) {
        promise?.then(node => this._next = node);
    }

    get next(): Promise<LinkedListNode<T>> | undefined {
        if (this._next) {
            return Promise.resolve(this._next);
        }
    }

    set prev(promise: Promise<LinkedListNode<T>> | undefined) {
        promise?.then(node => this._prev = node);
    }

    get prev(): Promise<LinkedListNode<T>> | undefined {
        if (this._prev) {
            return Promise.resolve(this._prev);
        }
    }

}

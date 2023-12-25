import { LinkedListNode } from "./node.three";
import { LinkedList as ILinkedList } from "./list.interface";
import { SimpleLink } from "../link.three";

export class LinkedList<T> implements ILinkedList<LinkedListNode<T>> {
    private _size: number;

    head?: LinkedListNode<T>;
    duration: number;

    private scene: THREE.Scene;
    private linkColor: THREE.Color | string | number;
    private linkLength: number;

    constructor(
        scene: THREE.Scene,
        duration: number,
        linkColor: THREE.Color | string | number,
        linkLength: number
    ) {
        this._size = 0;
        this.scene = scene;
        this.duration = duration;
        this.linkColor = linkColor;
        this.linkLength = linkLength;
    }

    get size() {
        return this._size;
    }

    async push(item: LinkedListNode<T>): Promise<number> {
        this._size++;

        item.show();

        if (!this.head) {
            this.head = item;
            return Promise.resolve(this.size);
        }

        let current = this.head;
        while (current.next) {
            current = current.next;
        }

        current.next = item;

        if (!current.linkToNext) {
            current.linkToNext = new SimpleLink(current, item, this.scene, this.linkColor);
            current.linkToNext.show();
        }

        return item
            .move(
                { x: current.x + this.linkLength, y: current.y, z: current.z },
                this.duration,
                () => current.linkToNext?.refresh()
            )
            .then(
                () => this.size
            );
    }

    // remove the last
    pop(): Promise<LinkedListNode<T> | undefined> {
        this._size--;
        return Promise.resolve(undefined);
    }

}

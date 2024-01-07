import { LinkedListNode } from "./node.three";
import { LinkedList as ILinkedList } from "./list.interface";
import { SimpleLink } from "../link.three";
import Position from "../../_commons/params/position.interface";

export class LinkedList<T> implements ILinkedList<LinkedListNode<T>> {
    private _size: number;

    head?: LinkedListNode<T>;
    duration: number;

    private scene: THREE.Scene;
    private linkColor: THREE.Color | string | number;
    private linkLength: number;

    public adjustSource?: (position: Position, width: number) => Position;
    public adjustTarget?: (position: Position, width: number) => Position;

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

            const adjustSource = (position: Position): Position => {
                if (this.adjustSource) {
                    return this.adjustSource(position, current.width);
                } else {
                    const { x, y, z } = position;
                    const width = current.width;
                    return { x: x + width / 2, y, z };
                }
            }

            const adjustTarget = (position: Position): Position => {
                if (this.adjustTarget) {
                    return this.adjustTarget(position, current.width);
                } else {
                    const { x, y, z } = position;
                    const width = item.width;
                    return { x: x - width / 2, y, z };
                }
            }

            current.linkToNext = new SimpleLink(current, adjustSource, item, adjustTarget, this.scene, this.linkColor);
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

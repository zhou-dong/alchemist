import { DoublyLinkedListNode } from "./node.three";
import { DoublyLinkedList as ILinkedList } from "./list.interface";
import { calDestination, calDistance } from '../../_commons/utils';
import { SimpleLink } from "../link.three";

const extractPosition = <T>({ x, y, z }: DoublyLinkedListNode<T>) => ({ x, y, z });

export class DoublyLinkedList<T> implements ILinkedList<DoublyLinkedListNode<T>> {
    private _size: number;

    private dummyHead: DoublyLinkedListNode<T>;
    private dummyTail: DoublyLinkedListNode<T>;
    private scene: THREE.Scene;
    private linkColor: THREE.Color | string | number

    duration: number;

    constructor(
        scene: THREE.Scene,
        duration: number,
        dummyHead: DoublyLinkedListNode<T>,
        dummyTail: DoublyLinkedListNode<T>,
        linkColor: THREE.Color | string | number

    ) {
        this.scene = scene;
        this.duration = duration;
        this._size = 0;
        this.dummyHead = dummyHead;
        this.dummyTail = dummyTail;
        this.dummyHead.next = this.dummyTail;
        this.dummyTail.prev = this.dummyHead;
        this.linkColor = linkColor;

        // this.dummyHead.linkToNext = new SimpleLink(this.dummyHead, this.dummyTail, scene, linkColor);
        // this.dummyTail.linkToPrev = new SimpleLink(this.dummyTail, this.dummyHead, scene, linkColor);

        // this.dummyHead.linkToNext.show();
        // this.dummyTail.linkToPrev.show();
    }

    get size() {
        return this._size;
    }

    // add to tail
    async push(item: DoublyLinkedListNode<T>): Promise<number> {

        const targetPosition = extractPosition(this.dummyTail);
        const distance = calDistance(this.dummyTail.prev!, this.dummyTail);
        const tailTargetPosition = calDestination(this.dummyTail, distance);

        item.prev = this.dummyTail.prev;
        item.next = this.dummyTail;

        this.dummyTail.prev!.next = item;
        this.dummyTail.prev = item;

        if (!item.linkToPrev) {
            // item.linkToPrev = new SimpleLink(item, item.prev!, this.scene, this.linkColor);
            // item.linkToPrev.show();
        }

        if (!item.linkToNext) {
            // item.linkToNext = new SimpleLink(item, item.next!, this.scene, this.linkColor);
            // item.linkToNext.show();
        }

        // item.linkToPrev.source = item;
        // item.linkToPrev.target = item.prev!;
        // item.linkToPrev.refresh();

        // item.linkToNext.source = item;
        // item.linkToNext.target = item.next;
        // item.linkToNext.refresh();

        this.dummyTail.linkToPrev!.target = item;
        this.dummyTail.linkToPrev!.refresh();

        item.prev!.linkToNext!.target = item;
        item.prev!.linkToNext!.refresh();

        this._size++;
        return Promise
            .all([
                item.move(
                    targetPosition,
                    this.duration,
                    () => {
                        item.linkToNext?.refresh();
                        item.linkToPrev?.refresh();
                        item.prev?.linkToNext?.refresh();
                    }
                ),
                this.dummyTail.move(
                    tailTargetPosition,
                    this.duration,
                    () => {
                        this.dummyTail.linkToPrev?.refresh();
                    }
                )
            ])
            .then(() => this.size);
    }

    // remove the last
    pop(): Promise<DoublyLinkedListNode<T> | undefined> {
        if (this._size === 0) {
            // todo animate
            return Promise.resolve(undefined);
        }

        const last: DoublyLinkedListNode<T> = this.dummyTail.prev!;

        this.dummyTail.prev = last.prev;
        last.prev!.next = this.dummyTail;

        last.prev = undefined;
        last.next = undefined;

        this._size--;
        return Promise.resolve(last);
    }

    // move the first
    shift(): Promise<DoublyLinkedListNode<T> | undefined> {
        if (this._size === 0) {
            // todo animate
            return Promise.resolve(undefined);
        }

        const head: DoublyLinkedListNode<T> = this.dummyHead.next!;

        this.dummyHead.next = head.next;
        head.next!.prev = this.dummyHead;

        head.prev = undefined;
        head.next = undefined;

        this._size--;

        return Promise.resolve(head);
    }

    // add to head
    unshift(item: DoublyLinkedListNode<T>): Promise<number> {
        item.next = this.dummyHead.next;
        item.prev = this.dummyHead;

        this.dummyHead.next!.prev = item;
        this.dummyHead.next = item;

        this._size++;

        // animate
        return Promise.resolve(this.size);
    }

}

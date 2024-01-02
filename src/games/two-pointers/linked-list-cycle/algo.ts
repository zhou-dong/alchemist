import Position from "../../../data-structures/_commons/params/position.interface";
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";
import { adjustX, adjustY, buildLinkedListNode } from "./styles";
import { skinDummyColor } from "./Code";

const dummySkinPosition: Position = { x: -15, y: 9, z: 0 }
const dummyTextPosition: Position = { x: adjustX(0, dummySkinPosition.x), y: adjustY(dummySkinPosition.y), z: dummySkinPosition.z };
const buildDummy = (scene: THREE.Scene) => {
    const dummy: LinkedListNode<number> = buildLinkedListNode(scene, -1, "D", dummySkinPosition, dummyTextPosition);
    dummy.nodeSkin.color = skinDummyColor;
    return dummy;
}

export enum Action {
    Ready,
    New_Dummy,
    Link_Dummy_Head,
    Define_Fast,
    Define_Slow,
    Fast_Forward,
    Both_Forward,
    Remove_Next,
    Return_Head
}

export interface Item {
    action: Action;
    dummy?: LinkedListNode<number>;
    fast?: LinkedListNode<number>;
    slow?: LinkedListNode<number>;
}

export function buildItems(scene: THREE.Scene, head: LinkedListNode<number> | undefined, n: number): Item[] {
    const items: Item[] = [];

    function removeNthFromEnd(head: LinkedListNode<number> | undefined, n: number): LinkedListNode<number> | undefined {

        items.push({ action: Action.Ready });

        const dummy: LinkedListNode<number> = buildDummy(scene);
        items.push({ dummy, action: Action.New_Dummy });

        dummy.next = head;
        items.push({ dummy, action: Action.Link_Dummy_Head });

        let fast: LinkedListNode<number> | undefined = dummy;
        items.push({ dummy, fast, action: Action.Define_Fast });

        let slow: LinkedListNode<number> | undefined = dummy;
        items.push({ dummy, fast, slow, action: Action.Define_Slow });

        for (let i = 0; i < n; i++) {
            fast = fast?.next;
            items.push({ dummy, fast, slow, action: Action.Fast_Forward });
        }

        while (fast?.next) {
            fast = fast?.next;
            slow = slow?.next;
            items.push({ dummy, fast, slow, action: Action.Both_Forward });
        }

        if (slow?.next) {
            // slow.next = slow.next.next;
            items.push({ dummy, fast, slow, action: Action.Remove_Next });
        }

        items.push({ dummy, fast, slow, action: Action.Return_Head });
        return dummy.next;
    };

    removeNthFromEnd(head, n);
    return items;
}

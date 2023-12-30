import Position from "../../../../data-structures/_commons/params/position.interface";
import { LinkedListNode } from "../../../../data-structures/list/linked-list/node.three";
import { adjustX, adjustY, buildLinkedListNode } from "../styles";

const skinDummyColor = "lightgray";
const dummySkinPosition: Position = { x: -15, y: 9, z: 0 }
const dummyTextPosition: Position = { x: adjustX(0, dummySkinPosition.x), y: adjustY(dummySkinPosition.y), z: dummySkinPosition.z };
const buildDummy = (scene: THREE.Scene) => {
    const dummy: LinkedListNode<number> = buildLinkedListNode(scene, -1, "D", dummySkinPosition, dummyTextPosition);
    dummy.nodeSkin.color = skinDummyColor;
    return dummy;
}

export enum Action {
    Ready,
    Define_Length,
    Define_Current,
    Count_Length,
    New_Dummy,
    Link_Dummy_Head,
    Set_Current_To_Dummy,
    Forward_Current,
    Remove_Next,
    Return_Head
}

export interface Item {
    action: Action;
    length?: number;
    dummy?: LinkedListNode<number>;
    current?: LinkedListNode<number>;
    linesToHighlight: number[],
}

export function buildItems(scene: THREE.Scene, head: LinkedListNode<number> | undefined, n: number): Item[] {
    const items: Item[] = [];

    function removeNthFromEnd(head: LinkedListNode<number> | undefined, n: number): LinkedListNode<number> | undefined {

        items.push({ action: Action.Ready, linesToHighlight: [] });

        let length = 0;
        items.push({ length, action: Action.Define_Length, linesToHighlight: [] });

        let current = head;
        items.push({ length, current, action: Action.Define_Current, linesToHighlight: [] });

        while (current) {
            length++;
            current = current.next;
            items.push({ length, current, action: Action.Count_Length, linesToHighlight: [] });
        }

        const dummy = buildDummy(scene);
        items.push({ length, current, dummy, action: Action.New_Dummy, linesToHighlight: [] });

        dummy.next = head;
        items.push({ length, current, dummy, action: Action.Link_Dummy_Head, linesToHighlight: [] });

        current = dummy;
        items.push({ length, current, dummy, action: Action.Set_Current_To_Dummy, linesToHighlight: [] });

        for (let i = 0; i < length - n; i++) {
            current = current?.next;
            items.push({ length, current, dummy, action: Action.Forward_Current, linesToHighlight: [] });
        }

        if (current?.next) {
            current.next = current.next.next;
            items.push({ length, dummy, action: Action.Remove_Next, linesToHighlight: [] });
        }

        items.push({ length, dummy, action: Action.Return_Head, linesToHighlight: [] });
        return dummy.next;
    };


    removeNthFromEnd(head, n);
    return items;
}

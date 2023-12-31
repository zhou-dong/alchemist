import Position from "../../../../data-structures/_commons/params/position.interface";
import { SimpleLink } from "../../../../data-structures/list/link.three";
import { LinkedListNode } from "../../../../data-structures/list/linked-list/node.three";
import { adjustX, adjustY, buildLinkedListNode, linkColor } from "../styles";

export const skinDummyColor = "lightgray";

const buildDummy = (scene: THREE.Scene, listLength: number) => {
    const calX = () => {
        switch (listLength) {
            case 5: return -11;
            case 6: return -13;
            default: return -15;
        }
    }

    const dummySkinPosition: Position = { x: calX(), y: 9, z: 0 }
    const dummyTextPosition: Position = { x: adjustX(0, dummySkinPosition.x), y: adjustY(dummySkinPosition.y), z: dummySkinPosition.z };
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
    head?: LinkedListNode<number>
}

export function buildItems(scene: THREE.Scene, head: LinkedListNode<number> | undefined, list: number[], n: number): Item[] {
    const items: Item[] = [];

    function removeNthFromEnd(head: LinkedListNode<number> | undefined, n: number): LinkedListNode<number> | undefined {

        items.push({ action: Action.Ready, linesToHighlight: [1], head });

        let length = 0;
        items.push({ length, action: Action.Define_Length, linesToHighlight: [3], head });

        let current = head;
        items.push({ length, current, action: Action.Define_Current, linesToHighlight: [4], head });

        while (current) {
            length++;
            items.push({ length, current, action: Action.Count_Length, linesToHighlight: [6, 7], head });
            current = current.next;
        }

        const dummy = buildDummy(scene, list.length);
        items.push({ length, current, dummy, action: Action.New_Dummy, linesToHighlight: [10], head });

        dummy.next = head;

        if (dummy.next) {
            const adjustSource = ({ x, y, z }: Position): Position => {
                const width = dummy.width;
                return { x: x + width / 2, y, z };
            }

            const adjustTarget = ({ x, y, z }: Position): Position => {
                const width = dummy.next?.width || 0;
                return { x: x - width / 2, y, z };
            }
            dummy.linkToNext = new SimpleLink(dummy, adjustSource, dummy.next, adjustTarget, scene, linkColor);
        }

        items.push({ length, current, dummy, action: Action.Link_Dummy_Head, linesToHighlight: [11], head });

        current = dummy;
        items.push({ length, current, dummy, action: Action.Set_Current_To_Dummy, linesToHighlight: [12], head });

        for (let i = 0; i < length - n; i++) {
            current = current?.next;
            items.push({ length, current, dummy, action: Action.Forward_Current, linesToHighlight: [15], head });
        }

        if (current?.next) {
            // current.next = current.next.next;
            items.push({ length, current, dummy, action: Action.Remove_Next, linesToHighlight: [18], head });
        }

        items.push({ length, dummy, action: Action.Return_Head, linesToHighlight: [20], head });
        return dummy.next;
    };


    removeNthFromEnd(head, n);
    return items;
}

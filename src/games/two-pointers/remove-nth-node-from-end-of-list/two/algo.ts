import Position from "../../../../data-structures/_commons/params/position.interface";
import { SimpleLink } from "../../../../data-structures/list/link.three";
import { LinkedListNode } from "../../../../data-structures/list/linked-list/node.three";
import { adjustX, adjustY, buildLinkedListNode, linkColor } from "../styles";

export enum Action {
    Ready,
    New_Dummy,
    Link_Dummy_Head,
    Set_Current_To_Dummy,
    New_Stack,
    Stack_Push,
    Stack_Pop,
    Stack_Pop_Two,
    Remove_Next,
    Return_Head
}

export interface Item {
    action: Action;
    dummy?: LinkedListNode<number>;
    current?: LinkedListNode<number>;
    linesToHighlight: number[],
}

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

export function buildItems(scene: THREE.Scene, head: LinkedListNode<number> | undefined, list: number[], n: number): Item[] {
    const items: Item[] = [];

    function removeNthFromEnd(head: LinkedListNode<number> | undefined, n: number): LinkedListNode<number> | undefined {

        items.push({ action: Action.Ready, linesToHighlight: [1] });

        const dummy = buildDummy(scene, list.length);
        items.push({ dummy, action: Action.New_Dummy, linesToHighlight: [3] });

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
        items.push({ dummy, action: Action.Link_Dummy_Head, linesToHighlight: [4] });

        let current: LinkedListNode<number> | undefined = dummy;
        items.push({ dummy, current, action: Action.Set_Current_To_Dummy, linesToHighlight: [5] })

        const stack: LinkedListNode<number>[] = [];
        items.push({ dummy, current, action: Action.New_Stack, linesToHighlight: [7] });

        while (current) {
            items.push({ dummy, current, action: Action.Stack_Push, linesToHighlight: [9, 10] });
            stack.push(current);
            current = current.next;
        }

        for (let i = 0; i < n; i++) {
            current = stack.pop();
            items.push({ dummy, current, action: Action.Stack_Pop, linesToHighlight: [14] });
        }

        const prev = stack.pop();
        items.push({ dummy, current: prev, action: Action.Stack_Pop_Two, linesToHighlight: [17] });

        if (prev && prev.next) {
            // prev.next = prev.next.next;
            items.push({ dummy, current: prev, action: Action.Remove_Next, linesToHighlight: [18] });
        }

        items.push({ dummy, action: Action.Return_Head, linesToHighlight: [20] });
        return dummy.next;
    };

    removeNthFromEnd(head, n);

    return items;
}
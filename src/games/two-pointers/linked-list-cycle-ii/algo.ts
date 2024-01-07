import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";

export enum Action {
    Ready,
    Define_Fast,
    Define_Slow,
    Detected_No_Cycle,
    Detected_Cycle,
    Reset_Head,
    Two_Steps_Forward,
    One_Step_Forward,
    Return_Cycle_Begin_Node
}

export interface Item {
    action: Action;
    fast?: LinkedListNode<number>;
    slow?: LinkedListNode<number>;
}

export function buildItems(head: LinkedListNode<number> | undefined): Item[] {
    const items: Item[] = [];

    function detectCycle(head: LinkedListNode<number> | undefined): LinkedListNode<number> | undefined {

        items.push({ action: Action.Ready });

        let fast = head
        items.push({ action: Action.Define_Fast, fast });

        let slow = head;
        items.push({ action: Action.Define_Slow, fast, slow });

        while (true) {
            if (fast === undefined || fast.next === undefined) {
                items.push({ action: Action.Detected_No_Cycle, fast, slow });
                return undefined;
            }

            fast = fast.next.next;
            slow = slow!.next;

            if (fast === slow) {
                items.push({ action: Action.Detected_Cycle, fast, slow });
                break;
            } else {
                items.push({ action: Action.Two_Steps_Forward, fast, slow });
            }
        }

        fast = head;
        items.push({ action: Action.Reset_Head, fast, slow });

        while (fast !== slow) {
            fast = fast!.next;
            slow = slow!.next;
            items.push({ action: Action.One_Step_Forward, fast, slow });
        }

        items.push({ action: Action.Return_Cycle_Begin_Node, fast, slow });
        return fast;
    };

    detectCycle(head);

    return items;
}

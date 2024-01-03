import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";

export enum Action {
    Ready,
    Define_Fast,
    Define_Slow,
    Forward,
    Return_True,
    Return_False
}

export interface Item {
    action: Action;
    fast?: LinkedListNode<number>;
    slow?: LinkedListNode<number>;
}

export function buildItems(head: LinkedListNode<number> | undefined): Item[] {
    const items: Item[] = [];

    function hasCycle(head: LinkedListNode<number> | undefined): boolean {
        items.push({ action: Action.Ready });

        let fast = head
        items.push({ action: Action.Define_Fast, fast });

        let slow = head;
        items.push({ action: Action.Define_Slow, fast, slow });

        while (fast !== undefined && fast.next !== undefined) {
            fast = fast.next.next;
            slow = slow?.next;
            items.push({ action: Action.Forward, fast, slow });

            if (fast === slow) {
                items.push({ action: Action.Return_True, fast, slow });
                return true;
            }
        }

        items.push({ action: Action.Return_False, fast, slow });
        return false;
    }

    hasCycle(head);

    return items;
}

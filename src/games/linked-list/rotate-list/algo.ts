import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";

export enum Action {
    Ready,
    Return_Head,
    Init_Length,
    Define_Current,
    Find_Tail,
    Cal_New_K,
    Return_Head_New_K_0,
    Cal_Steps,
    Tail_Connect_Head,
    Go_Next,
    Found_New_Head,
    Cut_Circle,
    Return_New_Head
}

export interface Step {
    action: Action;
    linesToHighlight: number[];
    k: number;
    head?: LinkedListNode<number>;
    newK?: number;
    current?: LinkedListNode<number>;
    length?: number;
    steps?: number;
    newHead?: LinkedListNode<number>;
    i?: number;
}

export function buildSteps(head: LinkedListNode<number> | undefined, k: number): Step[] {
    const items: Step[] = [];

    function rotateRight(head: LinkedListNode<number> | undefined, k: number): LinkedListNode<number> | undefined {
        if (!head || !k) {
            items.push({ action: Action.Return_Head, linesToHighlight: [5], k, head });
            return head;
        }

        let length = 1;
        items.push({ action: Action.Init_Length, linesToHighlight: [7], k, head, length });

        let current: LinkedListNode<number> | undefined = head;
        items.push({ action: Action.Define_Current, linesToHighlight: [8], k, head, length, current });

        while (current.next) {
            length++;
            current = current.next;
            items.push({ action: Action.Find_Tail, linesToHighlight: [10, 11], k, head, length, current });
        }

        const newK = k % length;
        items.push({ action: Action.Cal_New_K, linesToHighlight: [14], k, head, length, current, newK });

        if (!newK) {
            items.push({ action: Action.Return_Head_New_K_0, linesToHighlight: [16], k, head, length, current, newK });
            return head;
        }

        const steps = length - newK;
        items.push({ action: Action.Cal_Steps, linesToHighlight: [19], k, head, length, current, newK, steps });

        current.next = head;
        items.push({ action: Action.Tail_Connect_Head, linesToHighlight: [20], k, head, length, current, newK, steps });

        for (let i = 0; i < steps; i++) {
            current = current?.next;
            items.push({ action: Action.Go_Next, linesToHighlight: [22], k, head, length, current, newK, steps });
        }

        const newHead = current?.next;
        items.push({ action: Action.Found_New_Head, linesToHighlight: [25], k, head, length, current, newK, steps, newHead });

        current!.next = undefined;
        items.push({ action: Action.Cut_Circle, linesToHighlight: [26], k, head, length, current, newK, steps, newHead });

        items.push({ action: Action.Return_Head, linesToHighlight: [27], k, head, length, current, newK, steps, newHead });
        return newHead;
    };

    rotateRight(head, k);

    return items;
}

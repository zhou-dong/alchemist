import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";
import { ListNode } from "../_commons/listNode";

export enum Action {
    stand_by,
    define_even_head,
    define_even,
    define_odd,
    odd_next_to_even_next,
    odd_to_odd_next,
    even_next_to_odd_next,
    even_to_even_next,
    odd_next_to_even_head,
    return_head,
}

const getlinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.stand_by: return [1];
        case Action.define_even_head: return [5];
        case Action.define_even: return [6];
        case Action.define_odd: return [7];
        case Action.odd_next_to_even_next: return [9];
        case Action.odd_to_odd_next: return [10];
        case Action.even_next_to_odd_next: return [11]
        case Action.even_to_even_next: return [12];
        case Action.odd_next_to_even_head: return [14];
        case Action.return_head: return [15];
    }
}

export class Step {
    action: Action;
    linesToHighlight: number[];
    evenHead: LinkedListNode<number | string> | undefined;
    even: LinkedListNode<number | string> | undefined;
    odd: LinkedListNode<number | string> | undefined;

    constructor(
        action: Action,
        evenHead: LinkedListNode<number | string> | undefined,
        even: LinkedListNode<number | string> | undefined,
        odd: LinkedListNode<number | string> | undefined,
    ) {
        this.action = action;
        this.linesToHighlight = getlinesToHighlight(action);
        this.odd = odd;
        this.even = even;
        this.evenHead = evenHead;
    }
}

const buildProxyList = (head: LinkedListNode<number | string>): ListNode<LinkedListNode<number | string>> => {
    const proxyHead = new ListNode<LinkedListNode<number | string>>(head);
    let previous = proxyHead;
    let current: LinkedListNode<number | string> | undefined = head.next;
    while (current) {
        previous.next = new ListNode<LinkedListNode<number | string>>(current);
        previous = previous.next;
        current = current.next;
    }
    return proxyHead;
}

export function buildSteps(head: LinkedListNode<number | string>): Step[] {

    const steps: Step[] = [];

    function oddEvenList(head: ListNode<LinkedListNode<number | string>>): ListNode<LinkedListNode<number | string>> {
        steps.push(new Step(Action.stand_by, undefined, undefined, undefined));

        const evenHead = head.next;
        steps.push(new Step(Action.define_even_head, evenHead?.val, undefined, undefined));

        let even = evenHead;
        steps.push(new Step(Action.define_even, evenHead?.val, even?.val, undefined));

        let odd = head;
        steps.push(new Step(Action.define_odd, evenHead?.val, even?.val, odd.val));

        while (even !== undefined && even.next !== undefined) {
            odd.next = even.next;
            steps.push(new Step(Action.odd_next_to_even_next, evenHead?.val, even?.val, odd.val));

            odd = odd.next;
            steps.push(new Step(Action.odd_to_odd_next, evenHead?.val, even?.val, odd.val));

            even.next = odd.next;
            steps.push(new Step(Action.even_next_to_odd_next, evenHead?.val, even?.val, odd.val));

            even = even.next;
            steps.push(new Step(Action.even_to_even_next, evenHead?.val, even?.val, odd.val));
        }
        odd.next = evenHead;
        steps.push(new Step(Action.odd_next_to_even_head, evenHead?.val, even?.val, odd.val));

        steps.push(new Step(Action.return_head, evenHead?.val, even?.val, odd.val));
        return head;
    };

    const proxyHead = buildProxyList(head);
    oddEvenList(proxyHead);

    return steps;
}

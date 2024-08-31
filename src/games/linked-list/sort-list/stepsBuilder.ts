import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";
import { ListNode } from "../_commons/listNode";

export enum Action {
    stand_by,
    merge_new_dummy_head,
    merge_define_temp_temp1_temp2,
    merge_meet_while_condition,
    merge_while_temp1_less_than_temp2,
    merge_while_temp_next_temp1,
    merge_while_temp1_temp1_next,
    merge_while_temp_next_temp2,
    merge_while_temp2_temp2_next,
    merge_while_temp_temp_next,
    merge_temp1_not_null,
    merge_temp_next_temp1,
    merge_temp2_not_null,
    merge_temp_next_temp2,
    merge_return_dummy_head_next,
    sort_head_equal_null,
    sort_return_head,
    sort_head_next_equal_tail,
    sort_head_next_null,
    sort_return_head_two,
    sort_define_slow_fast,
    sort_meet_while_condition,
    sort_while_slow_slow_next,
    sort_while_fast_fast_next,
    sort_while_meet_fast_not_equal_tail,
    sort_while_nest_fast_fast_next,
    sort_sort1,
    sort_sort2,
    sort_return_merge,
    sort_list_sort,
}

const getlinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.stand_by: return [43];
        case Action.merge_new_dummy_head: return [2];
        case Action.merge_define_temp_temp1_temp2: return [3];
        case Action.merge_meet_while_condition: return [4];
        case Action.merge_while_temp1_less_than_temp2: return [5];
        case Action.merge_while_temp_next_temp1: return [6];
        case Action.merge_while_temp1_temp1_next: return [7];
        case Action.merge_while_temp_next_temp2: return [9];
        case Action.merge_while_temp2_temp2_next: return [10];
        case Action.merge_while_temp_temp_next: return [11];
        case Action.merge_temp1_not_null: return [14];
        case Action.merge_temp_next_temp1: return [15];
        case Action.merge_temp2_not_null: return [16];
        case Action.merge_temp_next_temp2: return [17];
        case Action.merge_return_dummy_head_next: return [19];
        case Action.sort_head_equal_null: return [23];
        case Action.sort_return_head: return [24];
        case Action.sort_head_next_equal_tail: return [26];
        case Action.sort_head_next_null: return [27];
        case Action.sort_return_head_two: return [28];
        case Action.sort_define_slow_fast: return [30];
        case Action.sort_meet_while_condition: return [31];
        case Action.sort_while_slow_slow_next: return [32];
        case Action.sort_while_fast_fast_next: return [33];
        case Action.sort_while_meet_fast_not_equal_tail: return [34];
        case Action.sort_while_nest_fast_fast_next: return [35];
        case Action.sort_sort1: return [38];
        case Action.sort_sort2: return [39];
        case Action.sort_return_merge: return [40];
        case Action.sort_list_sort: return [44];
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

const buildProxyList = (head: LinkedListNode<number>): ListNode<LinkedListNode<number>> => {
    const proxyHead = new ListNode<LinkedListNode<number>>(head);
    let previous = proxyHead;
    let current: LinkedListNode<number> | undefined = head.next;
    while (current) {
        previous.next = new ListNode<LinkedListNode<number>>(current);
        previous = previous.next;
        current = current.next;
    }
    return proxyHead;
}

export function buildSteps(head: LinkedListNode<number>): Step[] {

    const steps: Step[] = [];

    function merge(head1: ListNode<LinkedListNode<number>> | undefined, head2: ListNode<LinkedListNode<number>> | undefined) {
        const dummyHead = new ListNode<LinkedListNode<number>>(null as any);

        let temp = dummyHead, temp1 = head1, temp2 = head2;

        while (temp1 !== undefined && temp2 !== undefined) {
            if (temp1.val.data <= temp2.val.data) {
                temp.next = temp1;
                temp1 = temp1.next;
            } else {
                temp.next = temp2;
                temp2 = temp2.next;
            }
            temp = temp.next;
        }

        if (temp1 !== undefined) {
            temp.next = temp1;
        } else if (temp2 !== undefined) {
            temp.next = temp2;
        }

        return dummyHead.next;
    }

    function sort(head: ListNode<LinkedListNode<number>> | undefined, tail: ListNode<LinkedListNode<number>> | undefined): ListNode<LinkedListNode<number>> | undefined {
        if (head === undefined) {
            return head;
        }

        if (head.next === tail) {
            head.next = undefined;
            return head;
        }

        let slow: ListNode<LinkedListNode<number>> | undefined = head, fast: ListNode<LinkedListNode<number>> | undefined = head;
        while (fast !== tail) {
            slow = slow?.next;
            fast = fast?.next;
            if (fast !== tail) {
                fast = fast?.next;
            }
        }
        const list1 = sort(head, slow);
        const list2 = sort(slow, tail);
        return merge(list1, list2);
    }

    function sortList(head: ListNode<LinkedListNode<number>> | undefined): ListNode<LinkedListNode<number>> | undefined {
        return sort(head, undefined);
    };

    const proxyHead = buildProxyList(head);
    sortList(proxyHead);

    return steps;
}

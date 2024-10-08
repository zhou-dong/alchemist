import * as THREE from "three";
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";
import { ListNode } from "../_commons/listNode";
import { buildLink, createDummyNode } from "./styles";

export enum Action {
    stand_by,
    merge_entry,
    merge_new_dummy_head,
    merge_define_temp_temp1_temp2,
    merge_meet_while_condition,
    merge_while_temp1_less_than_temp2,
    merge_while_temp_next_temp1,
    merge_while_temp1_temp1_next,
    merge_while_temp1_large_than_temp2,
    merge_while_temp_next_temp2,
    merge_while_temp2_temp2_next,
    merge_while_temp_temp_next,
    merge_temp1_not_null,
    merge_temp_next_temp1,
    merge_temp2_not_null,
    merge_temp_next_temp2,
    merge_return_dummy_head_next,
    sort_entry,
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
    return_sorted,
}

const getlinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.stand_by: return [43];
        case Action.merge_entry: return [1];
        case Action.merge_new_dummy_head: return [2];
        case Action.merge_define_temp_temp1_temp2: return [3];
        case Action.merge_meet_while_condition: return [4];
        case Action.merge_while_temp1_less_than_temp2: return [5];
        case Action.merge_while_temp_next_temp1: return [6];
        case Action.merge_while_temp1_temp1_next: return [7];
        case Action.merge_while_temp1_large_than_temp2: return [8];
        case Action.merge_while_temp_next_temp2: return [9];
        case Action.merge_while_temp2_temp2_next: return [10];
        case Action.merge_while_temp_temp_next: return [12];
        case Action.merge_temp1_not_null: return [14];
        case Action.merge_temp_next_temp1: return [15];
        case Action.merge_temp2_not_null: return [16];
        case Action.merge_temp_next_temp2: return [17];
        case Action.merge_return_dummy_head_next: return [19];
        case Action.sort_entry: return [22];
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
        case Action.return_sorted: return [44];
    }
}

export class Step {
    readonly action: Action;
    readonly linesToHighlight: number[];
    readonly head: LinkedListNode<number>;

    merge_head1?: LinkedListNode<number>;
    merge_head2?: LinkedListNode<number>;
    merge_dummyHead?: LinkedListNode<number>;
    merge_temp?: LinkedListNode<number>;
    merge_temp_next?: LinkedListNode<number>;
    merge_temp1?: LinkedListNode<number>;
    merge_temp1_next?: LinkedListNode<number>;
    merge_temp2?: LinkedListNode<number>;
    merge_temp2_next?: LinkedListNode<number>;

    sort_head?: LinkedListNode<number>;
    sort_tail?: LinkedListNode<number>;
    sort_slow?: LinkedListNode<number>;
    sort_fast?: LinkedListNode<number>;
    sort_list1?: LinkedListNode<number>;
    sort_list2?: LinkedListNode<number>;

    constructor(action: Action, head: LinkedListNode<number>) {
        this.action = action;
        this.linesToHighlight = getlinesToHighlight(action);
        this.head = head;
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

const findLast = (head: LinkedListNode<number>): LinkedListNode<number> => {
    let current: LinkedListNode<number> = head;
    while (current.next) {
        current = current.next;
    }
    return current;
}

export function buildSteps(listHead: LinkedListNode<number>, scene: THREE.Scene): Step[] {

    const last = findLast(listHead);
    last.linkToNext = buildLink(scene, last, createDummyNode(scene));

    const steps: Step[] = [];

    function merge(head1: ListNode<LinkedListNode<number>> | undefined, head2: ListNode<LinkedListNode<number>> | undefined) {
        const s1 = new Step(Action.merge_entry, listHead);
        s1.merge_head1 = head1?.val;
        s1.merge_head2 = head2?.val;
        steps.push(s1);

        const dummyNode = createDummyNode(scene);
        dummyNode.linkToNext = buildLink(scene, dummyNode, createDummyNode(scene));

        const dummyHead = new ListNode<LinkedListNode<number>>(dummyNode);
        const s2 = new Step(Action.merge_new_dummy_head, listHead);
        s2.merge_head1 = head1?.val;
        s2.merge_head2 = head2?.val;
        s2.merge_dummyHead = dummyHead.val;
        steps.push(s2);

        let temp = dummyHead, temp1 = head1, temp2 = head2;
        const s3 = new Step(Action.merge_define_temp_temp1_temp2, listHead);
        s3.merge_temp = dummyHead.val;
        s3.merge_temp1 = head1?.val;
        s3.merge_temp2 = head2?.val;
        steps.push(s3);

        while (temp1 !== undefined && temp2 !== undefined) {
            const s4 = new Step(Action.merge_meet_while_condition, listHead);
            s4.merge_temp = temp.val;
            s4.merge_temp1 = temp1.val;
            s4.merge_temp2 = temp2.val;
            steps.push(s4);

            if (temp1.val.data <= temp2.val.data) {
                const s5 = new Step(Action.merge_while_temp1_less_than_temp2, listHead);
                s5.merge_temp = temp.val;
                s5.merge_temp1 = temp1.val;
                s5.merge_temp2 = temp2.val;
                steps.push(s5);

                temp.next = temp1;
                const s6 = new Step(Action.merge_while_temp_next_temp1, listHead);
                s6.merge_temp = temp.val;
                s6.merge_temp1 = temp1.val;
                s6.merge_temp2 = temp2.val;
                steps.push(s6);

                const s7 = new Step(Action.merge_while_temp1_temp1_next, listHead);
                s7.merge_temp = temp.val;
                s7.merge_temp1 = temp1?.val;
                s7.merge_temp2 = temp2.val;
                s7.merge_temp1_next = temp1?.next?.val;
                steps.push(s7);
                temp1 = temp1.next;
            } else {
                const s8 = new Step(Action.merge_while_temp1_large_than_temp2, listHead);
                s8.merge_temp = temp.val;
                s8.merge_temp1 = temp1?.val;
                s8.merge_temp2 = temp2.val;
                steps.push(s8);

                const s9 = new Step(Action.merge_while_temp_next_temp2, listHead);
                s9.merge_temp = temp.val;
                s9.merge_temp1 = temp1?.val;
                s9.merge_temp2 = temp2.val;
                steps.push(s9);
                temp.next = temp2;

                const s10 = new Step(Action.merge_while_temp2_temp2_next, listHead);
                s10.merge_temp = temp.val;
                s10.merge_temp1 = temp1?.val;
                s10.merge_temp2 = temp2?.val;
                s10.merge_temp2_next = temp2.next?.val
                steps.push(s10);
                temp2 = temp2.next;
            }

            const s11 = new Step(Action.merge_while_temp_temp_next, listHead);
            s11.merge_temp = temp.val;
            s11.merge_temp_next = temp.next.val;
            s11.merge_temp1 = temp1?.val;
            s11.merge_temp2 = temp2?.val;
            steps.push(s11);
            temp = temp.next;
        }

        if (temp1 !== undefined) {
            const s12 = new Step(Action.merge_temp1_not_null, listHead);
            s12.merge_temp = temp.val;
            s12.merge_temp1 = temp1?.val;
            s12.merge_temp2 = temp2?.val;
            steps.push(s12);

            temp.next = temp1;
            const s13 = new Step(Action.merge_temp_next_temp1, listHead);
            s13.merge_temp = temp.val;
            s13.merge_temp1 = temp1?.val;
            s13.merge_temp2 = temp2?.val;
            steps.push(s13);
        } else if (temp2 !== undefined) {
            const s14 = new Step(Action.merge_temp2_not_null, listHead);
            s14.merge_temp = temp.val;
            s14.merge_temp2 = temp2?.val;
            steps.push(s14);

            const s15 = new Step(Action.merge_temp_next_temp2, listHead);
            s15.merge_temp = temp.val;
            s15.merge_temp2 = temp2?.val;
            steps.push(s15);
            temp.next = temp2;
        }

        const s16 = new Step(Action.merge_return_dummy_head_next, listHead);
        s16.merge_temp = temp.val;
        s16.merge_temp1 = temp1?.val;
        s16.merge_temp2 = temp2?.val;
        s16.merge_dummyHead = dummyHead.val;
        steps.push(s16);
        return dummyHead.next;
    }

    function sort(head: ListNode<LinkedListNode<number>> | undefined, tail: ListNode<LinkedListNode<number>> | undefined): ListNode<LinkedListNode<number>> | undefined {
        const s1 = new Step(Action.sort_entry, listHead);
        s1.sort_head = head?.val;
        s1.sort_tail = tail?.val;
        steps.push(s1);

        if (head === undefined) {
            const s2 = new Step(Action.sort_head_equal_null, listHead);
            s2.sort_tail = tail?.val;
            steps.push(s2);

            const s3 = new Step(Action.sort_return_head, listHead);
            s3.sort_tail = tail?.val;
            steps.push(s3);
            return head;
        }

        if (head.next === tail) {
            const s4 = new Step(Action.sort_head_next_equal_tail, listHead);
            s4.sort_head = head?.val;
            s4.sort_tail = tail?.val;
            steps.push(s4);

            head.next = undefined;
            const s5 = new Step(Action.sort_head_next_null, listHead);
            s5.sort_head = head?.val;
            s5.sort_tail = tail?.val;
            steps.push(s5);

            const s6 = new Step(Action.sort_return_head_two, listHead);
            s6.sort_head = head?.val;
            s6.sort_tail = tail?.val;
            steps.push(s6);
            return head;
        }

        let slow: ListNode<LinkedListNode<number>> | undefined = head, fast: ListNode<LinkedListNode<number>> | undefined = head;
        const s7 = new Step(Action.sort_define_slow_fast, listHead);
        s7.sort_head = head?.val;
        s7.sort_tail = tail?.val;
        s7.sort_slow = slow?.val;
        s7.sort_fast = fast?.val;
        steps.push(s7);

        while (fast !== tail) {
            const s8 = new Step(Action.sort_meet_while_condition, listHead);
            s8.sort_head = head?.val;
            s8.sort_tail = tail?.val;
            s8.sort_slow = slow?.val;
            s8.sort_fast = fast?.val;
            steps.push(s8);

            slow = slow?.next;
            const s9 = new Step(Action.sort_while_slow_slow_next, listHead);
            s9.sort_head = head?.val;
            s9.sort_tail = tail?.val;
            s9.sort_slow = slow?.val;
            s9.sort_fast = fast?.val;
            steps.push(s9);

            fast = fast?.next;
            const s10 = new Step(Action.sort_while_fast_fast_next, listHead);
            s10.sort_head = head?.val;
            s10.sort_tail = tail?.val;
            s10.sort_slow = slow?.val;
            s10.sort_fast = fast?.val;
            steps.push(s10);

            if (fast !== tail) {
                const s11 = new Step(Action.sort_while_meet_fast_not_equal_tail, listHead);
                s11.sort_head = head?.val;
                s11.sort_tail = tail?.val;
                s11.sort_slow = slow?.val;
                s11.sort_fast = fast?.val;
                steps.push(s11);

                fast = fast?.next;
                const s12 = new Step(Action.sort_while_nest_fast_fast_next, listHead);
                s12.sort_head = head?.val;
                s12.sort_tail = tail?.val;
                s12.sort_slow = slow?.val;
                s12.sort_fast = fast?.val;
                steps.push(s12);
            }
        }

        const list1 = sort(head, slow);
        const s13 = new Step(Action.sort_sort1, listHead);
        s13.sort_head = head?.val;
        s13.sort_tail = tail?.val;
        s13.sort_slow = slow?.val;
        s13.sort_fast = fast?.val;
        s13.sort_list1 = list1?.val;
        steps.push(s13);

        const list2 = sort(slow, tail);
        const s14 = new Step(Action.sort_sort2, listHead);
        s14.sort_head = head?.val;
        s14.sort_tail = tail?.val;
        s14.sort_slow = slow?.val;
        s14.sort_fast = fast?.val;
        s14.sort_list1 = list1?.val;
        s14.sort_list2 = list2?.val;
        steps.push(s14);

        const s15 = new Step(Action.sort_return_merge, listHead);
        s15.sort_head = head?.val;
        s15.sort_tail = tail?.val;
        s15.sort_slow = slow?.val;
        s15.sort_fast = fast?.val;
        s15.sort_list1 = list1?.val;
        s15.sort_list2 = list2?.val;
        steps.push(s15);
        return merge(list1, list2);
    }

    function sortList(head: ListNode<LinkedListNode<number>> | undefined): ListNode<LinkedListNode<number>> | undefined {
        steps.push(new Step(Action.stand_by, listHead));
        steps.push(new Step(Action.sort_list_sort, listHead));
        const sorted = sort(head, undefined);
        steps.push(new Step(Action.return_sorted, listHead));
        return sorted;
    };

    const proxyHead = buildProxyList(listHead);
    sortList(proxyHead);

    return steps;
}

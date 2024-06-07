import { ListNode } from "../_commons/listNode";
import { build } from "../_commons/listBuilder";
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";

export enum Action {
    create_dummy_head,

}

export class Step {
    action: Action;
    linesToHighlight: number[];
    current: LinkedListNode<number | string>;

    constructor(
        action: Action,
        linesToHighlight: number[],
        current: LinkedListNode<number | string>,
    ) {
        this.action = action;
        this.linesToHighlight = linesToHighlight;
        this.current = current;
    }
}

export function buildSteps(listHead: LinkedListNode<number | string>, nums: number[]): Step[] {

    const steps: Step[] = [];

    function insertionSortList(head: ListNode<number>, realHead: LinkedListNode<number | string>): ListNode<number> | undefined {
        const dummyHead = new ListNode<number>(0);
        // const realDummyHead = new LinkedListNode<string>("D");
        steps.push(new Step(Action.create_dummy_head, [2], realHead))
        dummyHead.next = head;

        let curr = head;
        while (curr && curr.next) {
            if (curr.val <= curr.next.val) {
                curr = curr.next;
            } else {
                let temp = curr.next;
                curr.next = curr.next.next;

                let prev = dummyHead;
                while (prev.next && (prev.next.val <= temp.val)) {
                    prev = prev.next;
                }

                temp.next = prev.next;
                prev.next = temp;
            }
        }

        return dummyHead.next;
    };


    const head = build(nums);
    if (head) {
        insertionSortList(head, listHead);
    }

    return steps;
}

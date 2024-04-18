import { ListNode } from "../_commons/listNode";
import { build } from "../_commons/listBuilder";

export enum Action {
    New_Small_Dummy,
    New_Large_Dummy,
    Define_Small,
    Define_Large,
    Define_Head,
    Append_Small,
    Small_Forward,
    Append_Large,
    Large_Forward,
    Current_Forward,
    Remove_Large_Next,
    Connect_Small_Large,
    Return_Small_Dummy_Next
}

export interface Step {
    action: Action;
    linesToHighlight: number[];
}

export function buildSteps(nums: number[], num: number): Step[] {
    const steps: Step[] = [];

    function partition(head: ListNode<number>, x: number): ListNode<number> | undefined {
        const smallDummy = new ListNode(-1);
        steps.push({ action: Action.New_Small_Dummy, linesToHighlight: [6] });

        const largeDummy = new ListNode(-1);
        steps.push({ action: Action.New_Large_Dummy, linesToHighlight: [7] });

        let small = smallDummy;
        steps.push({ action: Action.Define_Small, linesToHighlight: [8] });

        let large = largeDummy;
        steps.push({ action: Action.Define_Large, linesToHighlight: [9] });

        let current: ListNode<number> | undefined = head;
        steps.push({ action: Action.Define_Head, linesToHighlight: [11] });
        while (current) {
            if (current.val < num) {
                small.next = current;
                steps.push({ action: Action.Append_Small, linesToHighlight: [14] });
                small = small.next;
                steps.push({ action: Action.Small_Forward, linesToHighlight: [15] });
            } else {
                large.next = current;
                steps.push({ action: Action.Append_Large, linesToHighlight: [17] });
                large = large.next;
                steps.push({ action: Action.Large_Forward, linesToHighlight: [18] });
            }
            current = current.next;
            steps.push({ action: Action.Current_Forward, linesToHighlight: [20] });
        }

        large.next = undefined;
        steps.push({ action: Action.Remove_Large_Next, linesToHighlight: [23] });

        small.next = largeDummy.next;
        steps.push({ action: Action.Connect_Small_Large, linesToHighlight: [24] });

        steps.push({ action: Action.Return_Small_Dummy_Next, linesToHighlight: [26] });
        return smallDummy.next;
    };

    const listHead = build(nums);
    if (listHead) {
        partition(listHead, num);
    }

    return steps;
}

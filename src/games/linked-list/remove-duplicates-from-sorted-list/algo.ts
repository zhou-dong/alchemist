import * as THREE from 'three';
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";
import { buildLinkedListNode, linkColor, skinDummyColor } from './styles';
import { SimpleLink } from '../../../data-structures/list/link.three';
import Position from '../../../data-structures/_commons/params/position.interface';

export enum Action {
    New_Dummy,
    Assign_Dummy_Next_To_Head,
    Define_Current,
    Define_A,
    Define_B,
    Assign_Current_Next_To_B,
    Assign_A_Next_To_B_Next,
    Assign_B_Next_To_A,
    Assign_Current_To_A,
    Return_Dummy_Next
}

export interface Step {
    action: Action;
    dummy: LinkedListNode<number>;
    head?: LinkedListNode<number>;
    current?: LinkedListNode<number>;
    a?: LinkedListNode<number>;
    b?: LinkedListNode<number>;
    temp?: LinkedListNode<number>;
    linesToHighlight: number[];
}

const buildDummyNode = (head: LinkedListNode<number>, scene: THREE.Scene, x: number, y: number) => {
    const dummy: LinkedListNode<number> = buildLinkedListNode(scene, -1, "D", { x, y, z: 0 }, { x: x - 0.3, y: y - 0.2, z: 0 });
    dummy.nodeSkin.color = skinDummyColor;
    dummy.next = head;
    const adjustSource = ({ x, y, z }: Position): Position => {
        const width = dummy.width;
        return { x: x + width / 2, y, z };
    }
    const adjustTarget = ({ x, y, z }: Position): Position => {
        const width = head.width;
        return { x: x - width / 2, y, z };
    }
    dummy.linkToNext = new SimpleLink(dummy, adjustSource, head, adjustTarget, scene, linkColor);
    return dummy;
}

export function buildSteps(head: LinkedListNode<number>, scene: THREE.Scene, x: number, y: number): Step[] {
    const steps: Step[] = [];

    function swapPairs(head: LinkedListNode<number>): LinkedListNode<number> | undefined {
        const dummy = buildDummyNode(head, scene, x, y);
        steps.push({ dummy, action: Action.New_Dummy, linesToHighlight: [2] });

        steps.push({ dummy, head, action: Action.Assign_Dummy_Next_To_Head, linesToHighlight: [3] });

        let current = dummy;
        steps.push({ dummy, current, action: Action.Define_Current, linesToHighlight: [5] });

        while (current.next && current.next.next) {
            const a = current.next;
            steps.push({ dummy, a, current, action: Action.Define_A, linesToHighlight: [7] });
            const b = current.next.next;
            steps.push({ dummy, a, b, current, action: Action.Define_B, linesToHighlight: [8] });

            current.next = b;
            steps.push({ dummy, a, b, current, action: Action.Assign_Current_Next_To_B, linesToHighlight: [10] });
            a.next = b.next;
            steps.push({ dummy, a, b, current, action: Action.Assign_A_Next_To_B_Next, linesToHighlight: [11], temp: a.next });
            let temp = b.next;
            b.next = a;
            steps.push({ dummy, a, b, current, action: Action.Assign_B_Next_To_A, linesToHighlight: [12], temp: temp });
            current = a;
            steps.push({ dummy, a, b, current, action: Action.Assign_Current_To_A, linesToHighlight: [13], temp: current.next });
        }

        steps.push({ dummy, action: Action.Return_Dummy_Next, linesToHighlight: [16] });
        return dummy.next;
    };

    swapPairs(head);

    return steps;
}

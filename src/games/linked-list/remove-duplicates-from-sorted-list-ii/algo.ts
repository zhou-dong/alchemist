import * as THREE from 'three';
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";
import { buildLinkedListNode, linkColor, skinDummyColor } from './styles';
import { SimpleLink } from '../../../data-structures/list/link.three';
import Position from '../../../data-structures/_commons/params/position.interface';

export enum Action {
    New_Dummy,
    Assign_Dummy_Next_To_Head,
    Define_Current,
    Get_Duplicated_Value,
    Delete_Next,
    Go_Next,
    Return_Dummy_Next
}

export interface Step {
    action: Action;
    dummy: LinkedListNode<number>;
    current?: LinkedListNode<number>;
    next?: LinkedListNode<number>;
    before?: LinkedListNode<number>;
    after?: LinkedListNode<number>;
    value?: number;
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

    function deleteDuplicates(head: LinkedListNode<number>): LinkedListNode<number> | undefined {
        const dummy = buildDummyNode(head, scene, x, y);
        steps.push({ dummy, action: Action.New_Dummy, linesToHighlight: [2] });
        steps.push({ dummy, action: Action.Assign_Dummy_Next_To_Head, linesToHighlight: [3] });

        let current = dummy;
        steps.push({ dummy, current, action: Action.Define_Current, linesToHighlight: [5] });

        while (current.next && current.next.next) {
            if (current.next.data === current.next.next.data) {
                const value = current.next.data;
                steps.push({ dummy, current, next: current.next, value, action: Action.Get_Duplicated_Value, linesToHighlight: [8] });
                while (current.next && current.next.data === value) {
                    const before = current.next;
                    const after = current.next.next;
                    current.next = current.next.next;
                    steps.push({ dummy, current, before, after, value, action: Action.Delete_Next, linesToHighlight: [10] });
                }
            } else {
                const next = current.next;
                steps.push({ dummy, current, next, action: Action.Go_Next, linesToHighlight: [13] });
                current = current.next;
            }
        }

        steps.push({ dummy, action: Action.Return_Dummy_Next, linesToHighlight: [17] });
        return dummy.next;
    };

    deleteDuplicates(head);

    return steps;
}

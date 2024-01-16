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

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

export function buildSteps(head: LinkedListNode<number>, scene: THREE.Scene, x: number, y: number): Step[] {
    const steps: Step[] = [];

    function partition(head: ListNode | null, x: number): ListNode | null {
        const smallDummy = new ListNode();
        const largeDummy = new ListNode();
        let small = smallDummy;
        let large = largeDummy;

        let current = head;
        while (current) {
            if (current.val < x) {
                small.next = current;
                small = small.next;
            } else {
                large.next = current;
                large = large.next;
            }
            current = current.next;
        }

        large.next = null;
        small.next = largeDummy.next;

        return smallDummy.next;
    };

    return steps;
}

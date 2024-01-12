import * as THREE from 'three';
import { LinkedListNode } from "../../../../data-structures/list/linked-list/node.three";
import { buildLinkedListNode, linkColor } from '../styles';
import { SimpleLink } from '../../../../data-structures/list/link.three';
import Position from '../../../../data-structures/_commons/params/position.interface';

export enum Order {
    PreOrder, PostOrder
}

export enum Action {
    Return_Head,
    Define_Temp,
    Swap
}

export interface Step {
    // action: Action;
    dummy: LinkedListNode<number>;
    linesToHighlight: number[]
}



export function buildSteps(head: LinkedListNode<number>, scene: THREE.Scene, x: number, y: number): Step[] {
    const steps: Step[] = [];

    function swapPairs(head: LinkedListNode<number>): LinkedListNode<number> | undefined {
        const dummy: LinkedListNode<number> = buildLinkedListNode(scene, -1, "D", { x, y, z: 0 }, { x: x - 0.4, y: y - 0.2, z: 0 });
        dummy.nodeSkin.color = "lightgray";
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

        dummy.show()
        dummy.linkToNext.show();

        steps.push({ dummy, linesToHighlight: [2] });

        let current = dummy;
        while (current.next && current.next.next) {
            const a = current.next;
            const b = current.next.next;

            current.next = b;
            a.next = b.next;
            b.next = a;
            current = a;
        }

        return dummy.next;
    };

    swapPairs(head);

    return steps;
}

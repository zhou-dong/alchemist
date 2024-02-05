import * as THREE from 'three';
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";
import { buildLinkedListNode, linkColor, skinDummyColor } from './styles';
import { SimpleLink } from '../../../data-structures/list/link.three';
import Position from '../../../data-structures/_commons/params/position.interface';

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
    smallDummy?: LinkedListNode<number>;
    largeDummy?: LinkedListNode<number>;
    current?: LinkedListNode<number>;
    small?: LinkedListNode<number>;
    large?: LinkedListNode<number>;
    linesToHighlight: number[];
}

export const buildLink = (scene: THREE.Scene, node: LinkedListNode<number>, next: LinkedListNode<number>): SimpleLink => {

    const adjustSource = ({ x, y, z }: Position): Position => {
        const width = node.width;
        return { x: x + width / 2, y, z };
    }

    const adjustTarget = ({ x, y, z }: Position): Position => {
        const width = next.width;
        return { x: x - width / 2, y, z };
    }

    return new SimpleLink(node, adjustSource, next, adjustTarget, scene, linkColor);
}

const buildDummyNode = (scene: THREE.Scene, text: string, x: number, y: number) => {
    const dummy: LinkedListNode<number> = buildLinkedListNode(scene, -1, text, { x, y, z: 0 }, { x: x - 0.3, y: y - 0.2, z: 0 });
    dummy.nodeSkin.color = skinDummyColor;
    return dummy;
}

export function buildSteps(head: LinkedListNode<number>, num: number, scene: THREE.Scene, x: number, y: number): Step[] {
    const steps: Step[] = [];

    function partition(head: LinkedListNode<number>, x: number): LinkedListNode<number> | undefined {
        const smallDummy = buildDummyNode(scene, "S", x, y - 5);
        steps.push({ action: Action.New_Small_Dummy, linesToHighlight: [6], smallDummy });

        const largeDummy = buildDummyNode(scene, "L", x, y - 5 - 5);
        steps.push({ action: Action.New_Large_Dummy, linesToHighlight: [7], smallDummy, largeDummy });

        let small = smallDummy;
        steps.push({ action: Action.Define_Small, linesToHighlight: [8], smallDummy, largeDummy, small });

        let large = largeDummy;
        steps.push({ action: Action.Define_Large, linesToHighlight: [9], smallDummy, largeDummy, small, large });

        let current: LinkedListNode<number> | undefined = head;
        steps.push({ action: Action.Define_Head, linesToHighlight: [11], smallDummy, largeDummy, small, large, current });
        while (current) {
            if (current.data < num) {
                small.next = current;
                steps.push({ action: Action.Append_Small, linesToHighlight: [14], smallDummy, largeDummy, small, large, current });
                small = small.next;
                steps.push({ action: Action.Small_Forward, linesToHighlight: [15], smallDummy, largeDummy, small, large, current });
            } else {
                large.next = current;
                steps.push({ action: Action.Append_Large, linesToHighlight: [17], smallDummy, largeDummy, small, large, current });
                large = large.next;
                steps.push({ action: Action.Large_Forward, linesToHighlight: [18], smallDummy, largeDummy, small, large, current });
            }
            current = current.next;
            steps.push({ action: Action.Current_Forward, linesToHighlight: [20], smallDummy, largeDummy, small, large, current });
        }

        large.next = undefined;
        steps.push({ action: Action.Remove_Large_Next, linesToHighlight: [23], smallDummy, largeDummy, small, large, current });

        small.next = largeDummy.next;
        steps.push({ action: Action.Connect_Small_Large, linesToHighlight: [24], smallDummy, largeDummy, small, large, current });

        steps.push({ action: Action.Return_Small_Dummy_Next, linesToHighlight: [26], smallDummy, largeDummy, small, large, current });
        return smallDummy.next;
    };

    partition(head, x);

    return steps;
}

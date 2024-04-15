import * as THREE from 'three';
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";
import { buildLinkedListNode, linkColor, skinDummyColor } from './styles';
import { SimpleLink } from '../../../data-structures/list/link.three';
import Position from '../../../data-structures/_commons/params/position.interface';

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

export const buildDummyNode = (scene: THREE.Scene, text: string, x: number, y: number) => {
    const dummy: LinkedListNode<number> = buildLinkedListNode(scene, -1, text, { x, y, z: 0 }, { x: x - 0.3, y: y - 0.2, z: 0 });
    dummy.nodeSkin.color = skinDummyColor;
    return dummy;
}

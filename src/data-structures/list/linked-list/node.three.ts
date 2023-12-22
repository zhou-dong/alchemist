import * as THREE from "three";
import { LinkedListNode as ILinkedListNode } from "./node.interface";
import { TextCube } from '../../_commons/cube/three/text-cube';

export class LinkedListNode<T> implements ILinkedListNode<TextCube<T>> {
    data: TextCube<T>;

    next?: LinkedListNode<T>;
    prev?: LinkedListNode<T>;

    nextPoint?: THREE.ArrowHelper;
    prevPoint?: THREE.ArrowHelper;

    constructor(data: TextCube<T>) {
        this.data = data;
    }

}

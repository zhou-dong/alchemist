import * as THREE from 'three';
import { TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry';
import { font } from '../../../commons/three';
import { LinkedListNode as ILinkedListNode } from "./node.interface";
import { Link } from '../link.three';
import { LinkedListBaseNode } from '../list-node-base';

export class LinkedListNode<T> extends LinkedListBaseNode<T> implements ILinkedListNode<T> {

    next?: LinkedListNode<T>;
    linkToNext?: Link<T>;

    constructor(
        data: T,
        text: string,
        scene: THREE.Scene,
        skinGeometry: THREE.BufferGeometry,
        skinMaterial: THREE.Material,
        textGeometryParameters: TextGeometryParameters,
        textMaterial: THREE.Material,
    ) {
        super(data, text, scene, skinGeometry, skinMaterial, textGeometryParameters, textMaterial)
    }
}

export class SimpleLinkedListNode<T> extends LinkedListNode<T> {

    constructor(
        data: T,
        text: string,
        scene: THREE.Scene,
        skinColor: string,
        skinWidth: number,
        skinHeight: number,
        skinDepth: number,
        skinOpacity: number,
        skinTransparent: boolean,
        textColor: string,
        fontSize: number,
        fontHeight: number
    ) {
        const skinMaterial = new THREE.MeshBasicMaterial({ color: skinColor, opacity: skinOpacity, transparent: skinTransparent });
        const skinGeometry = new THREE.BoxGeometry(skinWidth, skinHeight, skinDepth);
        const textGeometryParameters: TextGeometryParameters = { font, size: fontSize, height: fontHeight };
        const textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: textColor });

        super(
            data,
            text,
            scene,
            skinGeometry,
            skinMaterial,
            textGeometryParameters,
            textMaterial
        )
    }

}

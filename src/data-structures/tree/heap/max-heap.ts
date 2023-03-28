import * as THREE from 'three';
import { TreeNodeProps } from '../nodes/v2/builder';
import Heap from "./heap.class";

class MaxHeap<T> extends Heap<T>{

    constructor(
        treeNodeProps: TreeNodeProps,
        treeLineProps: THREE.LineBasicMaterial,
        scene: THREE.Scene
    ) {
        super(treeNodeProps, treeLineProps, scene);
    }

    protected shouldBubbleUp(current: T, parent: T): boolean {
        return current > parent;
    }

    protected shouldBubbleDown(current: T, child: T): boolean {
        return current < child;
    }
}

export default MaxHeap;

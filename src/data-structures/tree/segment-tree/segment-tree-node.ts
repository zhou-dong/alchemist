import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { TextSphere } from "../../_commons/sphere/text-sphere.interface";
import TreeNode from "../nodes/v2/node";
import Text from '../../_commons/params/text.interface';
import TextImpl from '../../_commons/three/text.class';
import Position from '../../_commons/params/position.interface';
import { calDestination, calDistance } from '../../_commons/utils';

export default class SegmentTreeNode extends TreeNode<number> {
    start: Text<number>;
    end: Text<number>;
    left?: SegmentTreeNode;
    right?: SegmentTreeNode;

    constructor(
        value: TextSphere<number>,
        start: number,
        end: number,
        rangeMaterial: THREE.Material,
        rangeGeometryParameters: TextGeometryParameters,
        scene: THREE.Scene,
        index?: number
    ) {
        super(value, index);
        this.start = new TextImpl(start, rangeMaterial, rangeGeometryParameters, scene);
        this.end = new TextImpl(end, rangeMaterial, rangeGeometryParameters, scene);
    }

    show() {
        super.show();
        this.start.show();
        this.end.show();
        return this;
    }

    hide() {
        super.hide();
        this.start.hide();
        this.end.hide();
        return this;
    }

    async moveTo(dest: Position, duration: number, onUpdate?: () => void): Promise<void> {
        const distance = calDistance(this.value.center, dest);
        const startDest = calDestination(this.start, distance);
        const endDest = calDestination(this.end, distance);

        const nodeMove = super.moveTo(dest, duration);
        const startMove = this.start.move(startDest, duration);
        const endMove = this.end.move(endDest, duration);

        return Promise.all([nodeMove, startMove, endMove]).then(() => { });
    }


}

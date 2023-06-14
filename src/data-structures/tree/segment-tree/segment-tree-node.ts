import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { TextSphere } from "../../_commons/sphere/text-sphere.interface";
import TreeNode from "../nodes/v2/node";
import Text from '../../_commons/params/text.interface';
import TextImpl from '../../_commons/three/text.class';

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
}

import SegmentTreeNode from "./segment-tree-node";
import ISegmentTree from "./segment-tree.interface";
import { wait } from "../../_commons/utils";
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import Position from "../../_commons/params/position.interface"
import { buildPerfectBinaryTree, TreeNode as TreePosition } from '../nodes/utils/perfect-binary-tree';
import { getLeftChildIndex } from "../nodes/utils/tree-node-utils";
import { getRightChildIndex } from "../nodes/utils/tree-node-utils";
import { getParentIndex } from "../nodes/utils/tree-node-utils";
import TextSphere from "../../_commons/sphere/three/text-sphere";
import Line from "../nodes/line";

export default class SegmentTree implements ISegmentTree {

    private root?: SegmentTreeNode;

    private scene: THREE.Scene;
    private normalSphereColor: string;
    private enabledSphereColor: string;
    private sphereGeometry: THREE.SphereGeometry;
    private sphereMaterial: () => THREE.Material;
    private textMaterial: THREE.Material;
    private textGeometryParameters: TextGeometryParameters;
    private lineMaterial: THREE.LineBasicMaterial;
    private rangeMaterial: THREE.Material;
    private rangeGeometryParameters: TextGeometryParameters;
    private initPosition: Position;
    private positions: TreePosition[];

    constructor(
        scene: THREE.Scene,
        normalSphereColor: string,
        enabledSphereColor: string,
        sphereGeometry: THREE.SphereGeometry,
        sphereMaterial: () => THREE.Material,
        textMaterial: THREE.Material,
        textGeometryParameters: TextGeometryParameters,
        lineMaterial: THREE.LineBasicMaterial,
        rangeMaterial: THREE.Material,
        rangeGeometryParameters: TextGeometryParameters,
        position: Position,
        depth: number,
        nodeDistance: Position,
        initPosition: Position
    ) {
        this.scene = scene;
        this.normalSphereColor = normalSphereColor;
        this.enabledSphereColor = enabledSphereColor;
        this.sphereGeometry = sphereGeometry;
        this.sphereMaterial = sphereMaterial;
        this.textMaterial = textMaterial;
        this.textGeometryParameters = textGeometryParameters;
        this.lineMaterial = lineMaterial;
        this.rangeMaterial = rangeMaterial;
        this.rangeGeometryParameters = rangeGeometryParameters;
        this.initPosition = initPosition;
        this.positions = this.buildTreeNodesPositions(depth, position, nodeDistance);
    }

    private buildTreeNodesPositions(depth: number, { x, y }: Position, nodeDistance: Position) {
        const positions = buildPerfectBinaryTree(depth, nodeDistance.x, nodeDistance.y);
        const xAlpha = (positions.length === 0) ? 0 : x - positions[0].x;
        positions.forEach(position => {
            position.x += xAlpha;
            position.y += y;
        });
        return positions;
    }

    private async buildNode(
        value: number,
        start: number,
        end: number,
        index: number,
        position: Position,
        duration: number
    ): Promise<SegmentTreeNode> {

        const textSphere = new TextSphere<number>(
            value,
            this.sphereGeometry,
            this.sphereMaterial(),
            this.textMaterial,
            this.textGeometryParameters,
            this.scene
        );

        const { x, y, z } = this.initPosition;
        textSphere.center.x = x;
        textSphere.center.y = y;
        textSphere.center.z = z;

        textSphere.textPosition.x = this.calTextX(value, x);
        textSphere.textPosition.y = y - 0.4;
        textSphere.textPosition.z = z;

        const node = new SegmentTreeNode(textSphere, start, end, this.rangeMaterial, this.rangeGeometryParameters, this.scene, index).show();
        node.value.sphereColor.setColor(this.enabledSphereColor);

        await node.moveTo(position, duration);
        node.value.sphereColor.setColor(this.normalSphereColor);

        return node;
    }

    private calTextX(value: number, x: number): number {
        const length: number = ("" + value).length;
        switch (length) {
            case 0: return x;
            case 1: return x - 0.3;
            case 2: return x - 0.6;
            case 3: return x - 0.8;
            default: return x - 1;
        }
    }

    async build(nums: number[], duration: number): Promise<void> {
        this.root = await this.buildTree(nums, 0, nums.length - 1, 0, this.positions[0], duration);
    }

    private async buildTree(
        nums: number[],
        start: number,
        end: number,
        index: number,
        position: TreePosition,
        duration: number
    ): Promise<SegmentTreeNode> {
        if (start === end) {
            return this.buildNode(nums[start], start, end, index, { x: position.x, y: position.y, z: 0 }, duration);
        }

        const mid = Math.floor((start + end) / 2);

        const left = await this.buildTree(nums, start, mid, getLeftChildIndex(index), position.left!, duration);
        const right = await this.buildTree(nums, mid + 1, end, getRightChildIndex(index), position.right!, duration);

        const value = left.value.value + right.value.value;
        const node = await this.buildNode(value, start, end, index, { x: position.x, y: position.y, z: 0 }, duration);
        node.left = left;
        node.right = right;
        this.buildTreeLine(getLeftChildIndex(index));
        this.buildTreeLine(getRightChildIndex(index));

        return node;
    }

    private buildTreeLine(index: number): Line {
        const nodePosition = this.positions[index];
        const parentPosition = this.positions[getParentIndex(index)];
        return new Line(
            { x: parentPosition.x, y: parentPosition.y, z: 0 },
            { x: nodePosition.x, y: nodePosition.y, z: 0 },
            this.lineMaterial,
            this.scene
        ).show();
    }

    update(index: number, value: number, duration: number): Promise<void> {
        return this.updateTree(this.root, index, value, duration);
    }

    private async updateTree(node: SegmentTreeNode | undefined, index: number, value: number, duration: number): Promise<void> {
        if (node === undefined) {
            return;
        }

        node.value.sphereColor.setColor(this.enabledSphereColor);
        await wait(duration);

        if (node.start.value === index && node.end.value === index) {
            node.value.value = value;
            node.value.sphereColor.setColor(this.normalSphereColor);
            return;
        }

        const mid = Math.floor((node.start.value + node.end.value) / 2);
        if (index <= mid) {
            await this.updateTree(node.left, index, value, duration);
        } else {
            await this.updateTree(node.right, index, value, duration);
        }

        node.value.value = (node.left?.value.value || 0) + (node.right?.value.value || 0);
        node.value.sphereColor.setColor(this.normalSphereColor);

        return wait(duration);
    }

    query(left: number, right: number, duration: number): Promise<number | undefined> {
        return this.queryRange(this.root, left, right, duration);
    }

    private async queryRange(node: SegmentTreeNode | undefined, left: number, right: number, duration: number): Promise<number | undefined> {
        if (node === undefined) {
            return;
        }

        node.value.sphereColor.setColor(this.enabledSphereColor);
        await wait(duration);

        if (node.start.value === left && node.end.value === right) {
            node.value.sphereColor.setColor(this.normalSphereColor);
            return node.value.value;
        }

        const mid = Math.floor((node.start.value + node.end.value) / 2);
        let value: number | undefined = undefined;

        if (right <= mid) {
            value = await this.queryRange(node.left, left, right, duration);
        } else if (left > mid) {
            value = await this.queryRange(node.right, left, right, duration);
        } else {
            const a = await this.queryRange(node.left, left, mid, duration) || 0;
            const b = await this.queryRange(node.right, mid + 1, right, duration) || 0;
            value = a + b;
        }

        node.value.sphereColor.setColor(this.normalSphereColor);
        await wait(duration);
        return value;
    }

}

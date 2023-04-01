import * as THREE from 'three';
import Line from '../nodes/line';
import { buildNode, TreeNodeProps } from '../nodes/v2/builder';
import TreeNode from "../nodes/v2/node";
import { getLeftChildIndex, getParentIndex, getRightChildIndex } from '../nodes/utils/tree-node-utils';
import IHeap from "./heap.interface";
import { buildPerfectBinaryTree, TreeNode as TreePosition } from '../nodes/utils/perfect-binary-tree';
import Position from '../../_commons/params/position';

abstract class Heap<T> implements IHeap<T>{

    private depth: number = 4;
    private treeNodeInitPosition = { x: 0, y: 0, z: 0 };

    private treeNodesPositions: TreePosition[];
    private treeNodes: TreeNode<T>[];
    private treeNodeProps: TreeNodeProps;
    private treeLineProps: THREE.LineBasicMaterial;

    private enabledTreeNodeColor: string;
    private treeLines: Map<number, Line>;
    private scene: THREE.Scene;

    constructor(
        treeNodeProps: TreeNodeProps,
        treeLineProps: THREE.LineBasicMaterial,
        enabledTreeNodeColor: string,
        depth: number,
        position: Position,
        xDistance: number,
        yDistance: number,
        scene: THREE.Scene
    ) {
        this.treeNodeProps = treeNodeProps;
        this.treeLineProps = treeLineProps;
        this.enabledTreeNodeColor = enabledTreeNodeColor;
        this.scene = scene;
        this.treeNodes = [];
        this.treeLines = new Map();
        this.treeNodesPositions = this.buildTreeNodesPositions(depth, position, xDistance, yDistance);
    }

    private buildTreeNodesPositions(depth: number, { x, y }: Position, xDistance: number, yDistance: number) {
        const positions = buildPerfectBinaryTree(depth, xDistance, yDistance);
        const xAlpha = (positions.length === 0) ? 0 : x - positions[0].x;

        positions.forEach(position => {
            position.x += xAlpha;
            position.y += y;
        })
        return positions;
    }

    async insert(item: T, duration?: number): Promise<void> {
        const index = this.treeNodes.length;
        await this.insertTreeNode(item, index, duration || 0, this.treeNodeInitPosition);
        return this.bubbleUp(index, duration || 0);
    }

    private insertTreeNode(item: T, index: number, duration: number, position: Position): Promise<void> {
        const node = this.buildTreeNode(item, position).show();
        this.treeNodes.push(node);

        const line = this.buildTreeLine(index);
        if (line) {
            this.treeLines.set(index, line.show());
        }

        return this.moveNode(node, line, index, duration);
    }

    private moveNode(node: TreeNode<T>, line: Line | undefined, index: number, duration: number): Promise<void> {
        const { x, y } = this.treeNodesPositions[index];
        const dest: Position = { x, y, z: 0 };
        const onUpdate = () => {
            if (line) {
                line.end = node.value.center;
            }
        };
        return node.moveTo(dest, duration, onUpdate);
    }

    private buildTreeNode(item: T, position: Position) {
        return buildNode<T>(this.treeNodeProps, item, this.scene, position);
    }

    private buildTreeLine(index: number): Line | undefined {
        const nodePosition = this.treeNodeInitPosition;
        const parentPosition = this.treeNodesPositions[getParentIndex(index)];

        if (parentPosition) {
            return new Line(
                { x: parentPosition.x, y: parentPosition.y, z: 0 },
                { x: nodePosition.x, y: nodePosition.y, z: 0 },
                this.treeLineProps,
                this.scene
            );
        } else {
            return;
        }
    }

    private async bubbleUp(index: number, duration: number): Promise<void> {
        if (index < 1) return Promise.resolve();
        const parentIndex = getParentIndex(index);
        if (this.shouldBubbleUp(this.getValue(index), this.getValue(parentIndex))) {
            await this.swap(index, parentIndex, duration);
            return this.bubbleUp(parentIndex, duration);
        }
        return Promise.resolve();
    }

    protected abstract shouldBubbleUp(current: T, parent: T): boolean;

    async delete(duration?: number): Promise<T | undefined> {

        const line = this.treeLines.get(this.treeNodes.length - 1);
        line?.hide();

        this.treeLines.delete(this.treeNodes.length - 1);

        const last = this.treeNodes.pop();
        if (this.treeNodes.length === 0 || !last) {
            if (last) {
                last.hide();
            }
            return Promise.resolve(last?.value.value);
        }

        const root = this.treeNodes[0];
        root.hide();

        this.treeNodes[0] = last;
        const { x, y } = this.treeNodesPositions[0];
        await last.moveTo({ x, y, z: 0 }, duration || 0);
        await this.bubbleDown(0, duration || 0);
        return Promise.resolve(root.value.value);
    }

    private getValue(index: number): T {
        return this.treeNodes[index].value.value;
    }

    private async bubbleDown(index: number, duration: number): Promise<void> {
        let target = index;

        const leftIndex = getLeftChildIndex(index);
        if (leftIndex < this.treeNodes.length && this.shouldBubbleDown(
            this.getValue(target), this.getValue(leftIndex)
        )) {
            target = leftIndex;
        }

        const rightIndex = getRightChildIndex(index);
        if (rightIndex < this.treeNodes.length && this.shouldBubbleDown(
            this.getValue(target), this.getValue(rightIndex)
        )) {
            target = rightIndex;
        }

        if (target === index) {
            return Promise.resolve();
        }

        await this.swap(target, index, duration);
        return this.bubbleDown(target, duration);
    }

    protected abstract shouldBubbleDown(current: T, child: T): boolean;

    private async swap(i: number, j: number, duration: number): Promise<void> {
        const x = this.treeNodes[i];
        const y = this.treeNodes[j];

        const back = x.value.sphereColor.color;

        x.value.sphereColor.setColor(this.enabledTreeNodeColor);
        y.value.sphereColor.setColor(this.enabledTreeNodeColor);

        const a = this.clonePosition(x.value.center);
        const b = this.clonePosition(y.value.center);

        [this.treeNodes[i], this.treeNodes[j]] = [this.treeNodes[j], this.treeNodes[i]];

        x.moveTo(b, duration);
        await y.moveTo(a, duration);

        x.value.sphereColor.setColor("#" + back);
        y.value.sphereColor.setColor("#" + back);
        return;
    }

    peek(duration?: number): Promise<T | undefined> {
        return Promise.resolve(this.treeNodes[0]?.value.value);
    }

    size(duration?: number): Promise<number> {
        return Promise.resolve(this.treeNodes.length);
    }

    isEmpty(duration?: number): Promise<boolean> {
        return Promise.resolve(this.treeNodes.length === 0);
    }

    async buildHeap(items: T[], duration?: number): Promise<void> {
        for (let i = 0; i < items.length; i++) {
            const { x, y } = this.treeNodesPositions[i];
            await this.insertTreeNode(items[i], i, duration || 0, { x, y, z: 0 });
        }
    }

    async heapify(duration?: number): Promise<void> {
        for (let i = Math.floor(this.treeNodes.length / 2) - 1; i >= 0; i--) {
            await this.bubbleDown(i, duration || 0);
        }
    }

    clear(duration?: number): Promise<void> {
        this.treeNodes.forEach(node => node.hide());
        this.treeLines.forEach(line => line.hide());
        this.treeNodes = [];
        this.treeLines = new Map();
        return Promise.resolve();
    }

    private clonePosition({ x, y, z }: Position): Position {
        return { x, y, z };
    }
}

export default Heap;

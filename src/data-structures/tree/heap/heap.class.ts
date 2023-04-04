import Line from '../nodes/line';
import { buildNode } from '../nodes/v2/builder';
import TreeNode from "../nodes/v2/node";
import { getLeftChildIndex, getParentIndex, getRightChildIndex } from '../nodes/utils/tree-node-utils';
import IHeap from "./heap.interface";
import { buildPerfectBinaryTree, TreeNode as TreePosition } from '../nodes/utils/perfect-binary-tree';
import Position from '../../_commons/params/position.interface';
import Array from '../../array/array.class';
import { Props } from './props';
import { TextCube } from '../../_commons/cube/three/text-cube';
import { wait } from '../../_commons/utils';

abstract class Heap<T> implements IHeap<T>{

    public props: Props;
    private array: Array<T>;
    private treeNodesPositions: TreePosition[];
    private treeNodes: TreeNode<T>[];
    private treeLines: Map<number, Line>;

    constructor(props: Props) {
        this.props = props;
        const { arrayPosition, treeInitDepth, treePosition, treeNodeDistance, duration } = props;
        this.treeNodes = [];
        this.treeLines = new Map();
        this.treeNodesPositions = this.buildTreeNodesPositions(treeInitDepth, treePosition, treeNodeDistance.x, treeNodeDistance.y);
        this.array = new Array<T>(arrayPosition, duration);
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

    async insert(item: T): Promise<void> {
        const index = this.treeNodes.length;
        this.array.push(this.buildArrayNode(item));
        await this.insertTreeNode(item, index, this.props.treeNodeProps.initPosition);
        return this.bubbleUp(index);
    }

    private calTextX<T>(value: T, x: number): number {
        const length: number = (value as any).toString().length;
        switch (length) {
            case 0: return x;
            case 1: return x - 0.3;
            case 2: return x - 0.6;
            case 3: return x - 0.8;
            default: return x - 1;
        }
    }

    private buildArrayNode(item: T): TextCube<T> {
        const { textMaterial, textGeometryParameters, cubeMaterial, cubeGeometry, initPosition } = this.props.arrayNodeProps;
        const { x, y, z } = initPosition;
        const cube = new TextCube<T>(
            item,
            textMaterial,
            textGeometryParameters,
            cubeMaterial(),
            cubeGeometry,
            this.props.scene
        );

        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;

        cube.textPosition.x = this.calTextX(item, x);
        cube.textPosition.y = y - 0.26;
        cube.textPosition.z = z;

        cube.show();
        return cube;
    }

    private insertTreeNode(item: T, index: number, position: Position): Promise<void> {
        const node = this.buildTreeNode(item, position).show();
        this.treeNodes.push(node);

        const line = this.buildTreeLine(index);
        if (line) {
            this.treeLines.set(index, line.show());
        }

        return this.moveNode(node, line, index);
    }

    private moveNode(node: TreeNode<T>, line: Line | undefined, index: number): Promise<void> {
        const { x, y } = this.treeNodesPositions[index];
        const dest: Position = { x, y, z: 0 };
        const onUpdate = () => {
            if (line) {
                line.end = node.value.center;
            }
        };
        return node.moveTo(dest, this.props.duration || 0, onUpdate);
    }

    private buildTreeNode(item: T, position: Position) {
        return buildNode<T>(this.props.treeNodeProps, item, this.props.scene, position);
    }

    private buildTreeLine(index: number): Line | undefined {
        const nodePosition = this.props.treeNodeProps.initPosition;
        const parentPosition = this.treeNodesPositions[getParentIndex(index)];

        if (parentPosition) {
            return new Line(
                { x: parentPosition.x, y: parentPosition.y, z: 0 },
                { x: nodePosition.x, y: nodePosition.y, z: 0 },
                this.props.treeLineProps.material,
                this.props.scene
            );
        } else {
            return;
        }
    }

    private async bubbleUp(index: number): Promise<void> {
        if (index < 1) return Promise.resolve();
        const parentIndex = getParentIndex(index);
        if (this.shouldBubbleUp(this.getValue(index), this.getValue(parentIndex))) {
            await Promise.all([
                this.swap(index, parentIndex),
                this.array.swap(index, parentIndex)
            ]);
            return this.bubbleUp(parentIndex);
        }
        return Promise.resolve();
    }

    protected abstract shouldBubbleUp(current: T, parent: T): boolean;

    async delete(): Promise<T | undefined> {

        const line = this.treeLines.get(this.treeNodes.length - 1);
        line?.hide();

        this.treeLines.delete(this.treeNodes.length - 1);

        const last = this.treeNodes.pop();
        const arrayLast = await this.array.pop();
        if (this.treeNodes.length === 0 || !last) {
            if (last) {
                last.hide();
                arrayLast?.hide();
            }
            return Promise.resolve(last?.value.value);
        }

        const root = this.treeNodes[0];
        root.hide();

        const arrayHead = await this.array.shift();
        arrayHead?.hide();

        this.treeNodes[0] = last;
        const { x, y } = this.treeNodesPositions[0];

        await Promise.all([
            this.array.unshift(arrayLast!),
            last.moveTo({ x, y, z: 0 }, this.props.duration || 0)
        ]);

        await this.bubbleDown(0);
        return Promise.resolve(root.value.value);
    }

    private getValue(index: number): T {
        return this.treeNodes[index].value.value;
    }

    private async bubbleDown(index: number): Promise<void> {
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

        await Promise.all([
            this.swap(target, index),
            this.array.swap(target, index)
        ]);

        return this.bubbleDown(target);
    }

    protected abstract shouldBubbleDown(current: T, child: T): boolean;

    private async swap(i: number, j: number): Promise<void> {
        const x = this.treeNodes[i];
        const y = this.treeNodes[j];

        const back = x.value.sphereColor.color;

        x.value.sphereColor.setColor(this.props.treeNodeProps.enabledTreeNodeColor);
        y.value.sphereColor.setColor(this.props.treeNodeProps.enabledTreeNodeColor);

        const a = this.clonePosition(x.value.center);
        const b = this.clonePosition(y.value.center);

        [this.treeNodes[i], this.treeNodes[j]] = [this.treeNodes[j], this.treeNodes[i]];

        await Promise.all([
            x.moveTo(b, this.props.duration || 0),
            y.moveTo(a, this.props.duration || 0)
        ]);

        x.value.sphereColor.setColor("#" + back);
        y.value.sphereColor.setColor("#" + back);
        return;
    }

    peek(): Promise<T | undefined> {
        return Promise.resolve(this.treeNodes[0]?.value.value);
    }

    size(): Promise<number> {
        return Promise.resolve(this.treeNodes.length);
    }

    isEmpty(): Promise<boolean> {
        return Promise.resolve(this.treeNodes.length === 0);
    }

    async buildHeap(items: T[],): Promise<void> {
        for (let i = 0; i < items.length; i++) {
            const { x, y } = this.treeNodesPositions[i];
            this.array.push(this.buildArrayNode(items[i]));
            await this.insertTreeNode(items[i], i, { x, y, z: 0 });
        }
    }

    async heapify(): Promise<void> {
        for (let i = Math.floor(this.treeNodes.length / 2) - 1; i >= 0; i--) {
            await this.bubbleDown(i);
        }
        await wait(0.1);
    }

    clear(): Promise<void> {
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

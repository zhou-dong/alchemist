import gsap from 'gsap';
import * as THREE from 'three';
import { Cube } from '../_commons/three/cube';

import { NodeParams, ShellParams } from '../_commons/three/collectionParams';
import { TextCube } from '../_commons/three/text-cube';

import { wait } from '../_commons/utils';
import { IStack } from './stack';
import { StackAlgo } from './stack-algo';

export class StackVis<T> implements IStack<T> {
    private stack: StackAlgo<TextCube<T>>;
    private nodeParams: NodeParams;
    private shellParams: ShellParams;
    private scene: THREE.Scene;
    private duration: number;

    constructor(
        nodeParams: NodeParams,
        shellParams: ShellParams,
        scene: THREE.Scene,
        duration: number
    ) {
        this.nodeParams = nodeParams;
        this.shellParams = shellParams;
        this.scene = scene;
        this.duration = duration;
        this.stack = new StackAlgo();
        this.buildStackShell();
    }

    private buildStackShell() {
        const shell = new StackAlgo<Cube>();
        const { material, position, size } = this.shellParams;
        const { width } = this.nodeParams;
        const { x, y, z } = position;
        for (let i = 0; i < size; i++) {
            const cube = new Cube(this.buildBoxGeometry(), material, this.scene);
            cube.x = x - width * i;
            cube.y = y;
            cube.z = z;
            cube.show();
            shell.push(cube);
        }
    }

    async push(value: T): Promise<number> {
        const item = this.createAndInitItemPosition(value);
        await this.playPush([item]);
        return this.stack.push(item);
    }

    async pushElements(elements: T[]): Promise<void> {
        const items = elements.map(e => this.createAndInitItemPosition(e));
        await this.playPush(items);
        items.map(item => this.stack.push(item));
    }

    private async playPush(items: TextCube<T>[]): Promise<void> {
        const { width } = this.nodeParams;
        await this.shiftNodesForPush(items.length);

        items.forEach((item, i) => {
            item.show();
            this.move(item, this.getTopX() + (items.length - 1 - i) * width);
        });

        await wait(this.duration);
    }

    private createAndInitItemPosition(value: T): TextCube<T> {
        const item = this.createItem(value);
        this.initItemPosition(item);
        return item;
    }

    private createItem(value: T): TextCube<T> {
        return new TextCube<T>(
            value,
            this.nodeParams.textMaterial,
            this.nodeParams.textGeometryParameters,
            this.nodeParams.material,
            this.buildBoxGeometry(),
            this.scene
        );
    }

    private initItemPosition(item: TextCube<T>): void {
        this.initItemNodePosition(item);
        this.initItemTextPosition(item);
    }

    private initItemNodePosition(item: TextCube<T>): void {
        const { x, y, z } = this.nodeParams.initPosition;
        item.x = x;
        item.y = y;
        item.z = z;
    }

    private initItemTextPosition(item: TextCube<T>): void {
        item.textX = this.adjustTextX(item.x);
        item.textY = this.adjustTextY(item.y);
        item.textZ = item.z;
    }

    private buildBoxGeometry(): THREE.BoxGeometry {
        const { width, height, depth } = this.nodeParams;
        return new THREE.BoxGeometry(width, height, depth);
    }

    async pop(): Promise<T | undefined> {
        const item: TextCube<T> | undefined = await this.stack.pop();
        await this.playPop(item);
        return item ? item.value : undefined;
    }

    async peek(): Promise<T | undefined> {
        const item: TextCube<T> | undefined = await this.stack.peek();
        await this.playPeek(item);
        return item ? item.value : undefined;
    }

    async isEmpty(): Promise<boolean> {
        await this.playIsEmpty();
        return this.stack.isEmpty();
    }

    async size(): Promise<number> {
        await this.playSize();
        return this.stack.size();
    }

    private adjustTextX(x: number): number {
        const { width, textAdjust } = this.nodeParams;
        return x - width / 2.7 + textAdjust.x;
    }

    private adjustTextY(y: number): number {
        const { height, textAdjust } = this.nodeParams;
        return y - height / 2 + textAdjust.y;
    }

    private async shiftNodesForPush(nodes: number): Promise<void> {
        const { width } = this.nodeParams;
        const iterator = this.stack.iterator();
        while (iterator.hasNext()) {
            const current = iterator.next();
            this.move(current, current.x + width * nodes);
        }

        await wait(this.duration);
    }

    private move(item: TextCube<T>, nodeX: number): void {
        const textX = this.adjustTextX(nodeX);

        gsap.to(item.mesh.position, { x: nodeX, duration: this.duration });
        gsap.to(item.textMesh.position, { x: textX, duration: this.duration });
    }

    private getTopX(): number {
        const { width } = this.nodeParams;
        const { position, size } = this.shellParams;
        const { x } = position;
        return x - width * (size - 1);
    }

    private playPop(item: TextCube<T> | undefined): Promise<void> {
        if (item) {
            return this.playPopItem(item);
        } else {
            return Promise.resolve();
        }
    }

    private async playPopItem(item: TextCube<T>): Promise<void> {
        const { width } = this.nodeParams;
        this.move(item, this.getTopX() - 10);

        const iterator = this.stack.iterator();
        while (iterator.hasNext()) {
            const current = iterator.next();
            this.move(current, current.x - width);
        }

        await wait(this.duration);
        item.hide();
    }

    private playPeek(item: TextCube<T> | undefined): Promise<void> {
        return Promise.resolve();
    }

    private playIsEmpty(): Promise<void> {
        return Promise.resolve();
    }

    private playSize(): Promise<void> {
        return Promise.resolve();
    }
}

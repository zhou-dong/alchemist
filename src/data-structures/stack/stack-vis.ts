import gsap from 'gsap';
import * as THREE from 'three';
import { Cube } from '../_commons/three/cube';
import { NodeSize, ShellParams } from '../_commons/three/collectionParams';
import { TextCube } from '../_commons/three/text-cube';
import { wait } from '../_commons/utils';
import { IStack } from './stack';
import { StackAlgo } from './stack-algo';

export class StackVis<T> implements IStack<TextCube<T>> {

    private stack: StackAlgo<TextCube<T>>;
    private nodeSize: NodeSize;
    private shellParams: ShellParams;
    private scene: THREE.Scene;
    private duration: number;

    constructor(
        nodeSize: NodeSize,
        shellParams: ShellParams,
        scene: THREE.Scene,
        duration: number
    ) {
        this.nodeSize = nodeSize;
        this.shellParams = shellParams;
        this.scene = scene;
        this.duration = duration;
        this.stack = new StackAlgo();
        this.buildStackShell();
    }

    private buildStackShell() {
        const shell = new StackAlgo<Cube>();
        const { material, position, size } = this.shellParams;
        const { width } = this.nodeSize;
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

    async push(item: TextCube<T>): Promise<number> {
        this.adjustItemTextPosition(item);
        await this.playPush([item]);
        return this.stack.push(item);
    }

    async pushElements(items: TextCube<T>[]): Promise<void> {
        items.forEach(item => this.adjustItemTextPosition(item));
        await this.playPush(items);
        items.map(item => this.stack.push(item));
    }

    private async playPush(items: TextCube<T>[]): Promise<void> {
        const { width } = this.nodeSize;
        await this.shiftNodesForPush(items.length);

        items.forEach((item, i) => {
            item.show();
            const x = this.getTopX() + (items.length - 1 - i) * width;
            const y = this.getTopY();
            const z = this.getTopZ();
            this.move(item, new THREE.Vector3(x, y, z));
        });

        await wait(this.duration);
    }

    private adjustItemTextPosition(item: TextCube<T>): void {
        item.textX = this.adjustTextX(item.x);
        item.textY = this.adjustTextY(item.y);
        item.textZ = item.z;
    }

    private buildBoxGeometry(): THREE.BoxGeometry {
        const { width, height, depth } = this.nodeSize;
        return new THREE.BoxGeometry(width, height, depth);
    }

    async pop(): Promise<TextCube<T> | undefined> {
        const item: TextCube<T> | undefined = await this.stack.pop();
        await this.playPop(item);
        return item;
    }

    async peek(): Promise<TextCube<T> | undefined> {
        const item: TextCube<T> | undefined = await this.stack.peek();
        await this.playPeek(item);
        return item;
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
        const { width, textAdjust } = this.nodeSize;
        return x - width / 2.7 + textAdjust.x;
    }

    private adjustTextY(y: number): number {
        const { height, textAdjust } = this.nodeSize;
        return y - height / 2 + textAdjust.y;
    }

    private async shiftNodesForPush(nodes: number): Promise<void> {
        const { width } = this.nodeSize;
        const iterator = this.stack.iterator();

        while (iterator.hasNext()) {
            const current = iterator.next();
            const x = current.x + width * nodes;
            const position = new THREE.Vector3(x, current.y, current.z);
            this.move(current, position);
        }

        await wait(this.duration);
    }

    private move(item: TextCube<T>, position: THREE.Vector3): void {
        const { x, y, z } = position;

        const textX = this.adjustTextX(x);
        const textY = this.adjustTextY(y);
        const textZ = z;

        gsap.to(item.mesh.position, { x, y, z, duration: this.duration });
        gsap.to(item.textMesh.position, { x: textX, y: textY, z: textZ, duration: this.duration });
    }

    private getTopX(): number {
        const { width } = this.nodeSize;
        const { position, size } = this.shellParams;
        const { x } = position;
        return x - width * (size - 1);
    }

    private getTopY(): number {
        return this.shellParams.position.y;
    }

    private getTopZ(): number {
        return this.shellParams.position.z;
    }

    private playPop(item: TextCube<T> | undefined): Promise<void> {
        if (item) {
            return this.playPopItem(item);
        } else {
            return Promise.resolve();
        }
    }

    private async playPopItem(item: TextCube<T>): Promise<void> {
        // const { width } = this.nodeSize;
        // this.move(item, this.getTopX() - 10);

        // const iterator = this.stack.iterator();
        // while (iterator.hasNext()) {
        //     const current = iterator.next();
        //     this.move(current, current.x - width);
        // }

        await wait(this.duration);
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

import gsap from 'gsap';
import * as THREE from 'three';
import { Cube } from '../_commons/three/cube';
import { NodeSize, ShellParams } from '../_commons/three/collectionParams';
import { TextCube } from '../_commons/three/text-cube';
import { calDestination, calDistance, wait } from '../_commons/utils';
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
        const { width, height, depth } = this.nodeSize;
        const { x, y, z } = position;
        for (let i = 0; i < size; i++) {
            const geometry = new THREE.BoxGeometry(width, height, depth)
            const cube = new Cube(geometry, material, this.scene);
            cube.x = x - width * i;
            cube.y = y;
            cube.z = z;
            cube.show();
            shell.push(cube);
        }
    }

    async push(item: TextCube<T>): Promise<number> {
        await this.playPush([item]);
        return this.stack.push(item);
    }

    async pushElements(items: TextCube<T>[]): Promise<void> {
        await this.playPush(items);
        items.forEach(item => this.stack.push(item));
    }

    private async playPush(items: TextCube<T>[]): Promise<void> {
        await this.shiftNodesForPush(items.length);

        items.forEach((item, i) => {
            const x = this.getTopX() + (items.length - 1 - i) * item.width;
            this.move(item, new THREE.Vector3(x, this.getTopY(), this.getTopZ()));
        });

        await wait(this.duration);
    }

    private move(item: TextCube<T>, position: THREE.Vector3): void {
        const distance = calDistance(item.mesh.position, position);
        const textEndPosition = calDestination(item.textMesh.position, distance);

        gsap.to(item.mesh.position, { ...position, duration: this.duration });
        gsap.to(item.textMesh.position, { ...textEndPosition, duration: this.duration });
    }

    async pop(): Promise<TextCube<T> | undefined> {
        this.playPop();
        return this.stack.pop();;
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

    private async shiftNodesForPush(nodes: number): Promise<void> {
        const iterator = this.stack.iterator();
        while (iterator.hasNext()) {
            const current = iterator.next();
            const distance = current.width * nodes;
            gsap.to(current.mesh.position, { x: current.x + distance, duration: this.duration });
            gsap.to(current.textMesh.position, { x: current.textX + distance, duration: this.duration });
        }

        await wait(this.duration);
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

    private playPop(): void {
        const iterator = this.stack.iterator();
        while (iterator.hasNext()) {
            const current = iterator.next();
            gsap.to(current.mesh.position, { x: current.x - current.width, duration: this.duration });
            gsap.to(current.textMesh.position, { x: current.textX - current.width, duration: this.duration });
        }
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

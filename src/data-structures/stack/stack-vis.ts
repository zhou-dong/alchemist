import gsap from 'gsap';
import * as THREE from 'three';
import { Cube } from '../_commons/three/cube';
import { TextCube } from '../_commons/three/text-cube';
import { calDestination, calDistance, wait } from '../_commons/utils';
import { IStack } from './stack';
import { StackAlgo } from './stack-algo';

export class StackVis<T> implements IStack<TextCube<T>> {

    private shells: Cube[];
    private stack: StackAlgo<TextCube<T>>;
    private duration: number;
    private position: THREE.Vector3;

    constructor(
        position: THREE.Vector3,
        duration: number
    ) {
        this.position = position;
        this.duration = duration;
        this.shells = [];
        this.stack = new StackAlgo();
    }

    increaseShells(shell: Cube) {
        const { x, y, z } = this.position;
        shell.x = x - this.getShellsLength();
        shell.y = y;
        shell.z = z;
        this.shells.push(shell);
    }

    decreaseShells(): Cube | undefined {
        return this.shells.pop();
    }

    private getShellsLength(): number {
        return this.shells.reduce((accumulator, current) => accumulator + current.width, 0)
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
            const x = this.position.x + (items.length - 1 - i) * item.width;
            this.move(item, new THREE.Vector3(x, this.position.y, this.position.z));
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

import * as THREE from 'three';
import { Cube } from '../_commons/three/cube';
import { TextCube } from '../_commons/three/text-cube';
import { wait } from '../_commons/utils';
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
        shell.x = x + this.getShellsWidth();
        shell.y = y;
        shell.z = z;
        this.shells.push(shell);
    }

    decreaseShells(): Cube | undefined {
        return this.shells.pop();
    }

    private getShellsWidth(): number {
        return this.shells.reduce((accumulator, current) => accumulator + current.width, 0)
    }

    async push(item: TextCube<T>): Promise<number> {
        await this.playPush(item);
        return this.stack.push(item);
    }

    private async playPush(item: TextCube<T>): Promise<void> {
        this.shiftNodesForPush();
        const position = new THREE.Vector3(this.position.x, this.position.y, this.position.z);
        item.move(position, this.duration);
        await wait(this.duration);
    }

    async pop(): Promise<TextCube<T> | undefined> {
        await this.playPop();
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

    private async shiftNodesForPush(): Promise<void> {
        const iterator = this.stack.iterator();
        while (iterator.hasNext()) {
            const current = iterator.next();
            const position = new THREE.Vector3(current.x + current.width, current.y, current.z);
            current.move(position, this.duration);
        }
    }

    private async playPop(): Promise<void> {
        const iterator = this.stack.iterator();
        while (iterator.hasNext()) {
            const current = iterator.next();
            const position = new THREE.Vector3(current.x - current.width, current.y, current.z);
            current.move(position, this.duration);
        }
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

import { TextCube } from "../_commons/cube/text-cube";
import Position from "../_commons/params/position";
import IArray from "./array.interface";

class Array<T> implements IArray<TextCube<T>>{

    private items: TextCube<T>[] = [];

    readonly length: number = this.items.length;

    private position: THREE.Vector3;
    public duration?: number;

    constructor(
        position: THREE.Vector3,
        duration?: number
    ) {
        this.position = position;
        this.duration = duration;
    }

    /**
     * Adds one or more elements to the end of an array and returns the new length of the array.
    */
    async push(...items: TextCube<T>[]): Promise<number> {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const position = this.calculateLastPosition();
            await item.move(position, this.duration || 0);
            this.items.push(item);
        }
        return Promise.resolve(this.items.length);
    }

    private calculateLastPosition(): Position {
        const { x, y, z } = this.position;
        return { x: this.length * x, y, z };
    }

    pop(): Promise<TextCube<T> | undefined> {
        return Promise.resolve(this.items.pop());
    }

    shift(): Promise<TextCube<T> | undefined> {
        return Promise.resolve(this.items.shift());
    }

    /**
     * Adds one or more elements to the beginning of an array and returns the new length of the array.
     */
    async unshift(...items: TextCube<T>[]): Promise<number> {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const position = this.calculateHeadPosition();
            await item.move(position, this.duration || 0);
            this.items.unshift(item);
        }
        return Promise.resolve(this.items.length);
    }

    private calculateHeadPosition(): Position {
        const { x, y, z } = this.position;
        return { x: this.length * x * -1, y, z };
    }

    async update(index: number, item: TextCube<T>): Promise<void> {
        const position = this.items[index].position;
        this.items[index].hide();
        await item.move(position, this.duration || 0);
        this.items[index] = item;
    }
}

export default Array;

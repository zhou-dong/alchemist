import { wait } from '../_commons/utils';
import { IStack } from './stack';
import { StackAlgo } from './stack-algo';
import Mover from '../_commons/params/mover.interface';
import Position from '../_commons/params/position.interface';
import Displayer from '../_commons/params/displayer.interface';

export interface Item extends Mover, Position {
    width: number;
    onMove?: () => void;
}

export interface Shell extends Position, Displayer {
    width: number;
}

export class Stack implements IStack<Item> {

    public duration: number;
    public shell: Shell;
    private stack: StackAlgo<Item>;

    constructor(shell: Shell, duration?: number) {
        this.shell = shell;
        this.duration = duration || 0;
        this.stack = new StackAlgo();
    }

    get left() {
        const { x, width } = this.shell;
        return x - width / 2;
    }

    async push(item: Item): Promise<number> {
        await this.playPush(item);
        return this.stack.push(item);
    }

    private async playPush(item: Item): Promise<void> {
        this.shiftNodesForPush();
        const position = this.getNextPosition(item);
        return item.move(position, this.duration, item.onMove);
    }

    private getNextPosition({ width }: Item): Position {
        const x = this.left + width / 2;
        const { y, z } = this.shell;
        return { x, y, z };
    }

    private get width(): number {
        let result = 0;
        const iterator = this.stack.iterator();
        while (iterator.hasNext()) {
            const current = iterator.next();
            result += current.width;
        }
        return result;
    }

    private async shiftNodesForPush(): Promise<void> {
        const iterator = this.stack.iterator();
        while (iterator.hasNext()) {
            const current = iterator.next();
            const { x, y, z, width } = current;
            current.move({ x: x + width, y, z }, this.duration);
        }
    }

    async pop(): Promise<Item | undefined> {
        await this.playPop();
        return this.stack.pop();
    }

    private async playPop(): Promise<void> {
        const iterator = this.stack.iterator();
        while (iterator.hasNext()) {
            const current = iterator.next();
            const { x, y, z, width } = current;
            current.move({ x: x - width, y, z }, this.duration);
        }
        await wait(this.duration);
    }

    peek(): Promise<Item | undefined> {
        return this.stack.peek();
    }

    isEmpty(): Promise<boolean> {
        return this.stack.isEmpty();
    }

    size(): Promise<number> {
        return this.stack.size();
    }

}

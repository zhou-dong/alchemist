export const title = "Implement Queue Using Stacks";

export const formula = `class MyQueue {

    private stackIn: number[];
    private stackOut: number[];

    constructor() {
        this.stackIn = [];
        this.stackOut = [];
    }

    enqueue(x: number): void {
        this.stackIn.push(x);
    }

    dequeue(): number | undefined {
        this.checkAndShift();
        return this.stackOut.pop();
    }

    peek(): number {
        this.checkAndShift();
        return this.stackOut[this.stackOut.length - 1];
    }

    private checkAndShift(): void {
        if (this.stackOut.length === 0) {
            this.shift();
        }
    }

    private shift(): void {
        let item = this.stackIn.pop();
        while (item) {
            this.stackOut.push(item);
            item = this.stackIn.pop();
        }
    }

    empty(): boolean {
        return this.stackIn.length === 0 && this.stackOut.length === 0;
    }
}`;

export const description = `Implement a first in first out (FIFO) queue using only two stacks. 

The implemented queue should support all the functions of a normal queue.

The functions are ***enqueue***, ***dequeue***, ***peek***, and ***empty***.`;

export const solution = ``;

export const usecases = '';

export const example = ``;

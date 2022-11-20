export const title = "Implement Stack Using Queue";

export const formula = `class MyStack {

    private queue: number[];

    constructor() {
        this.queue = [];
    }

    push(x: number): void {
        this.queue.push(x);
        const length = this.queue.length;
        for (let i = 0; i < length - 1; i++) {
            const item = this.queue.shift();
            this.queue.push(item);
        }
    }

    pop(): number | undefined {
        return this.queue.shift();
    }

    top(): number {
        return this.queue[0];
    }

    empty(): boolean {
        return this.queue.length === 0;
    }
}`;

export const description = `Implement a last in first out (LIFO) stack using only one queue. 

The implemented stack should support all the functions of a normal stack.

The functions are ***push***, ***pop***, ***top***, and ***empty***.`;

export const solution = ``;

export const usecases = '';

export const example = ``;

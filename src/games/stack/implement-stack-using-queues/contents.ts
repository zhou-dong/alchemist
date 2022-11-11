export const title = "Implement Stack Using Queues";

export const formula = `class MyStack {

    private queueIn: number[];
    private queueOut: number[];

    constructor() {
        this.queueIn = [];
        this.queueOut = [];
    }

    push(x: number): void {
        this.queueIn.push(x);
        let item = this.queueOut.shift();
        while (item) {
            this.queueIn.push(item);
            item = this.queueOut.shift();
        }
        this.swap();
    }

    private swap(): void {
        const temp = this.queueIn;
        this.queueIn = this.queueOut;
        this.queueOut = temp;
    }

    pop(): number | undefined {
        return this.queueOut.shift();
    }

    top(): number {
        return this.queueOut[0];
    }

    empty(): boolean {
        return this.queueOut.length === 0;
    }
}`;

export const description = `Implement a last in first out (LIFO) stack using only two queues. 

The implemented stack should support all the functions of a normal stack.

The functions are ***push***, ***pop***, ***top***, and ***empty***.`;

export const solution = ``;

export const usecases = '';

export const example = ``;

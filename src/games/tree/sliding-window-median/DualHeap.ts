import MaxHeap from "../../../data-structures/tree/heap/max-heap";
import MinHeap from "../../../data-structures/tree/heap/min-heap";

export default class DualHeap {

    smaller: MaxHeap<number>;
    greater: MinHeap<number>;

    constructor(smaller: MaxHeap<number>, greater: MinHeap<number>) {
        this.smaller = smaller;
        this.greater = greater;
    }

    async median() {
        const smallerSize = await this.smaller.size();
        const greaterSize = await this.greater.size();
        if (smallerSize === greaterSize) {
            const one = await this.smaller.peek() || 0;
            const two = await this.greater.peek() || 0;
            return (one + two) / 2;
        }
        return await this.smaller.peek();
    }

    async push(item: number) {
        const smallerTop = await this.smaller.peek();
        if (smallerTop === undefined || item <= smallerTop) {
            await this.smaller.push(item);
        } else {
            await this.greater.push(item);
        }
        await this.balance();
    }

    async delete(item: number) {
        const deleted = await this.smaller.delete(item);
        if (deleted === undefined) {
            await this.greater.delete(item);
        }
        await this.balance();
    }

    private async balance() {
        const smallerSize = await this.smaller.size();
        const greaterSize = await this.greater.size();
        if (smallerSize > greaterSize + 1) {
            const top = await this.smaller.pop();
            if (top !== undefined) {
                await this.greater.push(top);
            }
        } else if (greaterSize > smallerSize) {
            const top = await this.greater.pop();
            if (top !== undefined) {
                await this.smaller.push(top);
            }
        }
    }
}

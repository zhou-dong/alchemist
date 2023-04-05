import Heap from "./heap.class";

class MinHeap<T> extends Heap<T>{

    protected shouldBubbleUp(current: T, parent: T): boolean {
        return current < parent;
    }

    protected shouldBubbleDown(current: T, child: T): boolean {
        return current > child;
    }
}

export default MinHeap;

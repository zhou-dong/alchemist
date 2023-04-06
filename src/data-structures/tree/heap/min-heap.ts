import Heap from "./heap.class";
import { Comparable } from "./heap.interface";

class MinHeap<T extends Comparable | string | number> extends Heap<T>{

    protected shouldBubbleUp(current: T, parent: T): boolean {
        if (this.isPrimaryType(current)) {
            return current < parent;
        } else {
            return (current as Comparable).compareTo(parent as Comparable) < 0;
        }
    }

    protected shouldBubbleDown(current: T, child: T): boolean {
        if (this.isPrimaryType(current)) {
            return current > child;
        } else {
            return (current as Comparable).compareTo(child as Comparable) > 0;
        }
    }
}

export default MinHeap;

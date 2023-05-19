export interface Comparable {
    compareTo(other: Comparable): number;
}

interface Heap<T extends Comparable | string | number> {

    /**
     * This method is used to insert a new element into the heap. 
     * The new element is inserted at the bottom of the heap and 
     * is then moved upwards to its appropriate position to maintain the heap property.
     */
    push(item: T): Promise<void>;

    /**
     * This method is used to remove the root element from the heap. 
     * After the root is removed, the last element in the heap is moved to the root position, 
     * and it is then moved downwards to its appropriate position to maintain the heap property.
     */
    pop(): Promise<T | undefined>;

    /**
     * This method is used to return the root element of the heap without removing it. 
     * It is often used to check the highest-priority element in the heap.
     */
    peek(): Promise<T | undefined>;

    /**
     * This method is used to return the number of elements in the heap.
     */
    size(): Promise<number>;

    /**
     * This method is used to check if the heap is empty or not.
     */
    isEmpty(): Promise<boolean>;

    /**
     * This method is used to create a heap from a given list of elements. 
     * It takes O(n) time, where n is the number of elements in the list.
     */
    buildHeap(items: T[]): Promise<void>;

    /**
     * This method is used to remove all items from the heap, effectively emptying the heap.
     * It sets the internal array of items to an empty array, thus removing all references to the items that were previously stored in the heap. 
     * This can be useful when you want to reuse a heap for a different set of items or when you want to release memory used by the heap.
     */
    clear(): Promise<void>;

    /**
     * Lazy deleted items
     */
    deleted: Map<T, number>;

    items(): T[];
}

export default Heap;

export interface LinkedList<T> {

    /**
     * Represents the number of elements in that list. 
     * The value is an unsigned, 32-bit integer that is always numerically greater than the highest index in the list.
     */
    readonly size: number;

    /**
     * Adds one element to the end of an list and returns the new length of the list.
     */
    push(item: T): Promise<number>;

    /**
     * Removes the last element from an list and returns that element.
     */
    pop(): Promise<T | undefined>;

}

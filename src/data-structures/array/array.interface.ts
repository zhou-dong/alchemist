interface Array<T> {

    /**
     * Represents the number of elements in that array. 
     * The value is an unsigned, 32-bit integer that is always numerically greater than the highest index in the array.
     */
    readonly length: Promise<number>;

    readonly [index: number]: Promise<T>;

    /**
     * Adds one or more elements to the end of an array and returns the new length of the array.
     */
    push(...items: T[]): Promise<number>;

    /**
     * Removes the last element from an array and returns that element.
     */
    pop(): Promise<T | undefined>;

    /**
     * Removes the first element from an array and returns that element.
     */
    shift(): Promise<T | undefined>;

    /**
     * Removes the first element from an array and returns that element.
     */
    unshift(...items: T[]): Promise<number>;
}

export default Array

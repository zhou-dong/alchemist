import IArray from "./array.interface";

class Array<T> implements IArray<T>{

    readonly [index: number]: Promise<T>;

    readonly length: Promise<number> = Promise.resolve(1); // TODO

    push(...items: T[]): Promise<number> {
        throw new Error("Method not implemented.");
    }

    pop(): Promise<T | undefined> {
        throw new Error("Method not implemented.");
    }

    shift(): Promise<T | undefined> {
        throw new Error("Method not implemented.");
    }

    unshift(...items: T[]): Promise<number> {
        throw new Error("Method not implemented.");
    }

}

export default Array;

export default interface SegmentTree {
    build(array: number[]): Promise<void>;
    update(index: number, value: number): Promise<void>;
    query(left: number, right: number): Promise<number>;
}

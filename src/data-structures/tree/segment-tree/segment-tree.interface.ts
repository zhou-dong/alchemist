export default interface SegmentTree {
    build(array: number[], duration: number): Promise<void>;
    update(index: number, value: number, duration: number): Promise<void>;
    query(left: number, right: number, duration: number): Promise<number | undefined>;
}

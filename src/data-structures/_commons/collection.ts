export interface Collection {
    isEmpty(): Promise<boolean>;
    size(): Promise<number>;
}

import { Collection } from '../_commons/collection';

export interface IQueue<T> extends Collection {
  enqueue(t: T): Promise<number>;
  dequeue(): Promise<T | undefined>;
  peek(): Promise<T | undefined>;
}

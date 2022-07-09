import { AbstractArray } from '../_commons/abstract-array';
import { IQueue } from './queue';

export default class Queue<T> extends AbstractArray<T> implements IQueue<T> {
  constructor() {
    super([]);
  }

  enqueue(element: T): Promise<number> {
    return Promise.resolve(this.elements.push(element));
  }

  dequeue(): Promise<T | undefined> {
    return Promise.resolve(this.elements.shift());
  }

  peek(): Promise<T | undefined> {
    return Promise.resolve(this.elements[0]);
  }
}

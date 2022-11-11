import * as THREE from 'three';
import { Cube } from '../_commons/three/cube';
import { TextCube } from '../_commons/three/text-cube';
import { wait } from '../_commons/utils';
import { IQueue } from './queue';
import QueueAlgo from './queue-algo';

export default class QueueVis<T> implements IQueue<TextCube<T>> {

  public duration: number;
  private shells: Cube[];
  private queue: QueueAlgo<TextCube<T>>;
  private position: THREE.Vector3;

  constructor(
    position: THREE.Vector3,
    duration?: number
  ) {
    this.duration = duration ? duration : 0;
    this.position = position;
    this.shells = [];
    this.queue = new QueueAlgo();
  }

  increaseShells(shell: Cube) {
    const { x, y, z } = this.position;
    shell.x = x + this.getShellsLength();
    shell.y = y;
    shell.z = z;
    this.shells.push(shell);
  }

  decreaseShells(): Cube | undefined {
    return this.shells.pop();
  }

  emptyShells() {
    let item = this.shells.pop();
    while (item) {
      item.hide();
      item = this.shells.pop();
    }
  }

  get shellsLength(): number {
    return this.shells.length;
  }

  async empty() {
    let item = await this.dequeue();
    while (item) {
      item.hide();
      item = await this.dequeue();
    }
  }

  private getShellsLength(): number {
    return this.shells.reduce((accumulator, current) => accumulator + current.width, 0)
  }

  async enqueue(item: TextCube<T>): Promise<number> {
    await this.playEnqueue(item);
    return this.queue.enqueue(item);
  }

  async dequeue(): Promise<TextCube<T> | undefined> {
    await this.playDequeue();
    return this.queue.dequeue();
  }

  async peek(): Promise<TextCube<T> | undefined> {
    const item = await this.queue.peek();
    if (item) {
      await this.playPeek(item);
    }
    return item;
  }

  async isEmpty(): Promise<boolean> {
    await this.playIsEmpty();
    return this.queue.isEmpty();
  }

  async size(): Promise<number> {
    await this.playSize();
    return this.queue.size();
  }

  private async playEnqueue(item: TextCube<T>): Promise<void> {
    const width = this.sumQueueWidth(this.queue);
    const nodeEndPosition = this.position.clone().setX(this.position.x + width);
    item.move(nodeEndPosition, this.duration);
    await wait(this.duration);
  }

  private sumQueueWidth(queue: QueueAlgo<Cube>): number {
    let result = 0;
    const iterator = queue.iterator();
    while (iterator.hasNext()) {
      result += iterator.next().width;
    }
    return result;
  }

  private async playDequeue(): Promise<void> {
    const iterator = this.queue.iterator();
    while (iterator.hasNext()) {
      const current = iterator.next();
      const position = new THREE.Vector3(current.x - current.width, current.y, current.z);
      current.move(position, this.duration);
    }
    await wait(this.duration);
  }

  private playPeek(item: TextCube<T>): Promise<void> {
    return Promise.resolve();
  }

  private playIsEmpty(): Promise<void> {
    return Promise.resolve();
  }

  private playSize(): Promise<void> {
    return Promise.resolve();
  }
}

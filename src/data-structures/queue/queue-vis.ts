import gsap from 'gsap';
import * as THREE from 'three';
import { Cube } from '../_commons/three/cube';
import { TextCube } from '../_commons/three/text-cube';
import { calDestination, calDistance, wait } from '../_commons/utils';
import { IQueue } from './queue';
import QueueAlgo from './queue-algo';

export default class QueueVis<T> implements IQueue<TextCube<T>> {

  private shells: Cube[];
  private queue: QueueAlgo<TextCube<T>>;
  private duration: number;
  private position: THREE.Vector3;

  constructor(
    position: THREE.Vector3,
    duration: number
  ) {
    this.position = position;
    this.duration = duration;
    this.shells = [];
    this.queue = new QueueAlgo<TextCube<T>>();
  }

  increaseShells(shell: Cube) {
    const { x, y, z } = this.position;
    shell.x = x - this.getShellLength();
    shell.y = y;
    shell.z = z;
    this.shells.push(shell);
  }

  decreaseShells(): Cube | undefined {
    return this.shells.pop();
  }

  private getShellLength(): number {
    return this.shells.reduce((accumulator, current) => accumulator + current.width, 0)
  }

  async enqueue(item: TextCube<T>): Promise<number> {
    await this.playEnqueue(item);
    return this.queue.enqueue(item);
  }

  async dequeue(): Promise<TextCube<T> | undefined> {
    this.playDequeue();
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

    const nodeEndPosition = this.position.clone().setX(this.position.x - width);
    const distance = calDistance(item.mesh.position, nodeEndPosition);
    const textEndPosition = calDestination(item.textMesh.position, distance);

    gsap.to(item.mesh.position, { ...nodeEndPosition, duration: this.duration });
    gsap.to(item.textMesh.position, { ...textEndPosition, duration: this.duration });

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

  private playDequeue(): void {
    const iterator = this.queue.iterator();
    while (iterator.hasNext()) {
      const current = iterator.next();
      gsap.to(current.mesh.position, { x: current.x + current.width, duration: this.duration });
      gsap.to(current.textMesh.position, { x: current.textX + current.width, duration: this.duration });;
    }
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

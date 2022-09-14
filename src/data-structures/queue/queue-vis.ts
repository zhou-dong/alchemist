import gsap from 'gsap';
import * as THREE from 'three';
import { Cube } from '../_commons/three/cube';
import { NodeSize, ShellParams } from '../_commons/three/collectionParams';
import { TextCube } from '../_commons/three/text-cube';
import { calDestination, calDistance, wait } from '../_commons/utils';
import { IQueue } from './queue';
import QueueAlgo from './queue-algo';

export default class QueueVis<T> implements IQueue<TextCube<T>> {

  private queue: QueueAlgo<TextCube<T>>;
  private nodeSize: NodeSize;
  private shellParams: ShellParams;
  private scene: THREE.Scene;
  private duration: number;

  constructor(
    nodeSize: NodeSize,
    shellParams: ShellParams,
    scene: THREE.Scene,
    duration: number
  ) {
    this.nodeSize = nodeSize;
    this.shellParams = shellParams;
    this.scene = scene;
    this.duration = duration;
    this.queue = new QueueAlgo<TextCube<T>>();
    this.buildQueueShell();
  }

  private buildQueueShell() {
    const queueShell = new QueueAlgo<Cube>();
    const { material, position, size } = this.shellParams;
    const { width, height, depth } = this.nodeSize;
    const { x, y, z } = position;
    for (let i = 0; i < size; i++) {
      const geometry = new THREE.BoxGeometry(width, height, depth);
      const cube = new Cube(geometry, material, this.scene);
      cube.x = x - width * i;
      cube.y = y;
      cube.z = z;
      cube.show();
      queueShell.enqueue(cube);
    }
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
    const { position } = this.shellParams;
    const width = this.sumQueueWidth(this.queue);

    const nodeEndPosition = position.clone().setX(position.x - width);
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

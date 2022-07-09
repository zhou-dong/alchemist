import gsap from 'gsap';
import * as THREE from 'three';
import { Cube } from '../_commons/three/cube';
import { NodeParams, ShellParams } from '../_commons/three/collectionParams';
import { TextCube } from '../_commons/three/text-cube';
import { wait } from '../_commons/utils';
import { IQueue } from './queue';
import QueueAlgo from './queue-algo';

export default class QueueVis<T> implements IQueue<T> {
  private queue: QueueAlgo<TextCube<T>>;
  private nodeParams: NodeParams;
  private shellParams: ShellParams;
  private scene: THREE.Scene;
  private duration: number;

  constructor(
    nodeParams: NodeParams,
    shellParams: ShellParams,
    scene: THREE.Scene,
    duration: number
  ) {
    this.nodeParams = nodeParams;
    this.shellParams = shellParams;
    this.scene = scene;
    this.duration = duration;
    this.queue = new QueueAlgo<TextCube<T>>();
    this.buildQueueShell();
  }

  async enqueue(value: T): Promise<number> {
    const item = this.createItem(value);
    this.initItemPosition(item);
    await this.playEnqueue(item);
    return this.queue.enqueue(item);
  }

  private createItem(value: T): TextCube<T> {
    return new TextCube<T>(
      value,
      this.nodeParams.textMaterial,
      this.nodeParams.textGeometryParameters,
      this.nodeParams.material,
      this.buildBoxGeometry(),
      this.scene
    );
  }

  private initItemPosition(item: TextCube<T>): void {
    this.initItemNodePosition(item);
    this.initItemTextPosition(item);
  }

  private initItemNodePosition(item: TextCube<T>): void {
    const { x, y, z } = this.nodeParams.initPosition;
    item.x = x;
    item.y = y;
    item.z = z;
  }

  private initItemTextPosition(item: TextCube<T>): void {
    item.textX = this.adjustTextX(item.x);
    item.textY = this.adjustTextY(item.y);
    item.textZ = item.z;
  }

  private buildBoxGeometry(): THREE.BoxGeometry {
    const { width, height, depth } = this.nodeParams;
    return new THREE.BoxGeometry(width, height, depth);
  }

  private buildQueueShell() {
    const queueShell = new QueueAlgo<Cube>();
    const { material, position, size } = this.shellParams;
    const { width } = this.nodeParams;
    const { x, y, z } = position;
    for (let i = 0; i < size; i++) {
      const cube = new Cube(this.buildBoxGeometry(), material, this.scene);
      cube.x = x - width * i;
      cube.y = y;
      cube.z = z;
      cube.show();
      queueShell.enqueue(cube);
    }
  }

  async dequeue(): Promise<T | undefined> {
    const item = await this.queue.dequeue();
    if (item) {
      await this.playDequeue(item);
      return Promise.resolve(item.value);
    } else {
      return Promise.resolve(undefined);
    }
  }

  async peek(): Promise<T | undefined> {
    const item = await this.queue.peek();
    if (item) {
      await this.playPeek(item);
      return Promise.resolve(item.value);
    } else {
      return Promise.resolve(undefined);
    }
  }

  async isEmpty(): Promise<boolean> {
    await this.playIsEmpty();
    return this.queue.isEmpty();
  }

  async size(): Promise<number> {
    await this.playSize();
    return this.queue.size();
  }

  private sumItemsWidth(): number {
    return this.sumQueueWidth(this.queue);
  }

  private sumQueueWidth(queue: QueueAlgo<Cube>): number {
    let result = 0;
    const iterator = queue.iterator();
    while (iterator.hasNext()) {
      result += iterator.next().width;
    }
    return result;
  }

  private adjustTextX(x: number): number {
    const { width, textAdjust } = this.nodeParams;
    return x - width / 2.7 + textAdjust.x;
  }

  private adjustTextY(y: number): number {
    const { height, textAdjust } = this.nodeParams;
    return y - height / 2 + textAdjust.y;
  }

  private async playEnqueue(item: TextCube<T>): Promise<void> {
    const { position } = this.shellParams;
    const width = this.sumItemsWidth();

    const nodeEndPosition = position
      .clone()
      .setX(position.x - width);

    const textEndPosition = position
      .clone()
      .setX(this.adjustTextX(nodeEndPosition.x))
      .setY(this.adjustTextY(nodeEndPosition.y));

    item.show();

    gsap.to(item.mesh.position, {
      ...nodeEndPosition,
      duration: this.duration,
    });

    gsap.to(item.textMesh.position, {
      ...textEndPosition,
      duration: this.duration,
    });

    await wait(this.duration);
    return Promise.resolve();
  }

  private async playDequeue(item: TextCube<T>): Promise<void> {
    const { width } = this.nodeParams;
    const { position } = this.shellParams;
    const { x } = position;

    const endX = x + 10;
    const endTextX = this.adjustTextX(endX);

    // remove item from queue.
    gsap.to(item.mesh.position, { x: endX, duration: this.duration });
    gsap.to(item.textMesh.position, { x: endTextX, duration: this.duration });

    // arrange exist items in queue.
    let index = 0;
    const iterator = this.queue.iterator();
    while (iterator.hasNext()) {
      const current = iterator.next();

      const nodeNewX = x - width * index;
      const textNewX = this.adjustTextX(nodeNewX);

      gsap.to(current.mesh.position, {
        x: nodeNewX,
        duration: this.duration,
      });
      gsap.to(current.textMesh.position, {
        x: textNewX,
        duration: this.duration,
      });

      index += 1;
    }

    await wait(this.duration);
    item.hide();
    return Promise.resolve();
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

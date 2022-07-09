import gsap from 'gsap';
import * as THREE from 'three';
import { TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry';
import { Cube } from '../_commons/three/cube';
import { TextCube } from '../_commons/three/text-cube';
import { wait } from '../_commons/utils';
import { IQueue } from './queue';
import QueueAlgo from './queue-algo';

export default class QueueVis<T> implements IQueue<T> {
  private queue: QueueAlgo<TextCube<T>>;
  private queueShell: QueueAlgo<Cube>;
  private queuePosition: THREE.Vector3;

  private nodeMaterial: THREE.Material;
  private nodeTextMaterial: THREE.Material;
  private nodeTextGeometryParameters: TextGeometryParameters;
  private nodeInitPosition: THREE.Vector3;
  private nodeTextAdjust: THREE.Vector3;
  private nodeWidth: number;
  private nodeHeight: number;
  private nodeDepth: number;

  private scene: THREE.Scene;
  private duration: number;

  constructor(
    queueMaterial: THREE.Material,
    queuePosition: THREE.Vector3,
    queueShellSize: number,
    nodeMaterial: THREE.Material,
    nodeTextMaterial: THREE.Material,
    nodeTextGeometryParameters: TextGeometryParameters,
    nodeInitPosition: THREE.Vector3,
    nodeTextAdjust: THREE.Vector3,
    nodeWidth: number,
    nodeHeight: number,
    nodeDepth: number,
    scene: THREE.Scene,
    duration: number
  ) {
    this.queuePosition = queuePosition;
    this.nodeMaterial = nodeMaterial;
    this.nodeTextMaterial = nodeTextMaterial;
    this.nodeTextGeometryParameters = nodeTextGeometryParameters;
    this.nodeInitPosition = nodeInitPosition;
    this.nodeTextAdjust = nodeTextAdjust;
    this.nodeWidth = nodeWidth;
    this.nodeHeight = nodeHeight;
    this.nodeDepth = nodeDepth;
    this.scene = scene;
    this.queue = new QueueAlgo<TextCube<T>>();
    this.queueShell = new QueueAlgo<Cube>();
    this.duration = duration;
    this.buildQueueShell(queueMaterial, queueShellSize);
  }

  async enqueue(value: T): Promise<number> {
    const item = this.createItem(value);
    await this.playEnqueue(item);
    return this.queue.enqueue(item);
  }

  private createItem(value: T): TextCube<T> {
    return new TextCube<T>(
      value,
      this.nodeTextMaterial,
      this.nodeTextGeometryParameters,
      this.nodeMaterial,
      this.buildBoxGeometry(),
      this.scene
    );
  }

  private buildBoxGeometry(): THREE.BoxGeometry {
    return new THREE.BoxGeometry(
      this.nodeWidth,
      this.nodeHeight,
      this.nodeDepth
    );
  }

  private buildQueueShell(material: THREE.Material, shellSize: number) {
    const { x, y, z } = this.queuePosition;
    for (let i = 0; i < shellSize; i++) {
      const cube = new Cube(this.buildBoxGeometry(), material, this.scene);
      cube.x = x - this.nodeWidth * i;
      cube.y = y;
      cube.z = z;
      cube.show();
      this.queueShell.enqueue(cube);
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
    return x - this.nodeWidth / 2.7 + this.nodeTextAdjust.x;
  }

  private adjustTextY(y: number): number {
    return y - this.nodeHeight / 2 + this.nodeTextAdjust.y;
  }

  private async playEnqueue(item: TextCube<T>): Promise<void> {
    const width = this.sumItemsWidth();

    item.x = this.nodeInitPosition.x;
    item.y = this.nodeInitPosition.y;
    item.z = this.nodeInitPosition.z;

    item.textX = this.adjustTextX(item.x);
    item.textY = this.adjustTextY(item.y);
    item.textZ = item.z;

    const nodeEndPosition = this.queuePosition
      .clone()
      .setX(this.queuePosition.x - width);

    const textEndPosition = this.queuePosition
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
    const { x } = this.queuePosition;

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

      const nodeNewX = x - this.nodeWidth * index;
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

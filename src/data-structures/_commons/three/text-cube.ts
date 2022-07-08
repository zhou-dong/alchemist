import * as THREE from 'three';
import {
  TextGeometry,
  TextGeometryParameters,
} from 'three/examples/jsm/geometries/TextGeometry';
import { Cube } from './cube';
import { TextCube as ITextCube } from '../text-cube';

export class TextCube<T> extends Cube implements ITextCube<T> {
  private _value: T;
  public textMesh: THREE.Mesh;

  constructor(
    value: T,
    textMaterial: THREE.Material,
    textGeometryParameters: TextGeometryParameters,
    cubeMaterial: THREE.Material,
    cubeGeometry: THREE.BoxGeometry,
    scene: THREE.Scene
  ) {
    super(cubeGeometry, cubeMaterial, scene);
    this._value = value;

    const textGeometry = new TextGeometry(value + '', textGeometryParameters);
    this.textMesh = new THREE.Mesh(textGeometry, textMaterial);
  }

  public get value(): T {
    return this._value;
  }

  public get textX(): number {
    return this.textMesh.position.x;
  }

  public set textX(v: number) {
    this.textMesh.position.setX(v);
  }

  public get textY(): number {
    return this.textMesh.position.y;
  }

  public set textY(v: number) {
    this.textMesh.position.setY(v);
  }

  public get textZ(): number {
    return this.textMesh.position.z;
  }

  public set textZ(v: number) {
    this.textMesh.position.setZ(v);
  }

  public show(): void {
    super.show();
    this.scene.add(this.textMesh);
  }

  public hide(): void {
    super.hide();
    this.scene.remove(this.textMesh);
  }
}

import * as THREE from 'three';
import { Cube as ICube } from '../cube';

export class Cube implements ICube {
  protected scene: THREE.Scene;
  private geometry: THREE.BoxGeometry;
  private material: THREE.Material;
  public mesh: THREE.Mesh;

  constructor(
    geometry: THREE.BoxGeometry,
    material: THREE.Material,
    scene: THREE.Scene
  ) {
    this.scene = scene;
    this.geometry = geometry;
    this.material = material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  public get x(): number {
    return this.mesh.position.x;
  }

  public set x(v: number) {
    this.mesh.position.setX(v);
  }

  public get y(): number {
    return this.mesh.position.y;
  }

  public set y(v: number) {
    this.mesh.position.setY(v);
  }

  public get z(): number {
    return this.mesh.position.z;
  }

  public set z(v: number) {
    this.mesh.position.setZ(v);
  }

  public get width(): number {
    return this.mesh.scale.x;
  }

  public set width(v: number) {
    this.mesh.scale.setX(v);
  }

  public get height(): number {
    return this.mesh.scale.y;
  }

  public set height(v: number) {
    this.mesh.scale.setY(v);
  }

  public get depth(): number {
    return this.mesh.scale.z;
  }

  public set depth(v: number) {
    this.mesh.scale.setZ(v);
  }

  public show(): void {
    this.scene.add(this.mesh);
  }

  public hide(): void {
    this.scene.remove(this.mesh);
  }
}

import * as THREE from 'three';

import Display from '../../params/display';
import Move from '../../params/move';
import Position from '../../params/position';
import DisplayImpl from "../../three/display";
import MoveImpl from "../../three/move";
import PositionImpl from "../../three/position"

import { Cube as ICube } from '../cube';
import { calDistance } from '../../utils';

export class Cube implements ICube {

  position: Position;
  private display: Display;
  private mover: Move;
  private mesh: THREE.Mesh;

  constructor(
    geometry: THREE.BoxGeometry,
    material: THREE.Material,
    scene: THREE.Scene
  ) {
    this.mesh = new THREE.Mesh(geometry, material);
    this.position = new PositionImpl(this.mesh);
    this.mover = new MoveImpl(this.mesh);
    this.display = new DisplayImpl(scene, this.mesh);
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

  protected distance(position: Position): Position {
    return calDistance(this.position, position);
  }

  public move(position: Position, duration: number) {
    return this.mover.move(position, duration);
  }

  public show(): void {
    this.display.show();
  }

  public hide(): void {
    this.display.hide();
  }
}

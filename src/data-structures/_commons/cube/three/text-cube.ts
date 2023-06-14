import * as THREE from 'three';
import { TextGeometry, TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry';
import Display from '../../params/display.interface';
import Mover from '../../params/mover.interface';
import Position from '../../params/position.interface';
import DisplayImpl from "../../three/display";
import MoveImpl from "../../three/mover.class";
import PositionImpl from "../../three/position.class"
import { Cube } from './cube';
import { TextCube as ITextCube } from '../text-cube';
import { calDestination } from '../../utils';

export class TextCube<T> extends Cube implements ITextCube<T> {

  value: T;
  textPosition: Position;
  private textDisplay: Display;
  private textMover: Mover;

  constructor(
    value: T,
    textMaterial: THREE.Material,
    textGeometryParameters: TextGeometryParameters,
    cubeMaterial: THREE.Material,
    cubeGeometry: THREE.BoxGeometry,
    scene: THREE.Scene
  ) {
    super(cubeGeometry, cubeMaterial, scene);
    this.value = value;
    const textGeometry = new TextGeometry(value + '', textGeometryParameters);
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    this.textPosition = new PositionImpl(textMesh);
    this.textMover = new MoveImpl(textMesh);
    this.textDisplay = new DisplayImpl(scene, textMesh);
  }

  public async move(position: Position, duration: number) {
    const distance = super.distance(position);
    const textEndPosition = calDestination(this.textPosition, distance);
    const cubeMove = super.move(position, duration)
    const textMove = this.textMover.move(textEndPosition, duration);
    return Promise.all([cubeMove, textMove]).then(() => { });
  }

  public show(): void {
    super.show();
    this.textDisplay.show();
  }

  public hide(): void {
    super.hide();
    this.textDisplay.hide();
  }
}

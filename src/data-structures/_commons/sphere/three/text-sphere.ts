import * as THREE from 'three';
import { TextGeometry, TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry';
import Display from '../../display';
import Move from '../../move';
import Position from '../../position';
import DisplayImpl from "../../three/display";
import MoveImpl from "../../three/move";
import PositionImpl from "../../three/position"
import { TextSphere as ITextSphere } from "../text-sphere";
import Sphere from './sphere';
import { calDestination } from '../../utils';

export default class TextSphere<T> extends Sphere implements ITextSphere<T> {

  value: T;
  textPosition: Position;
  private textDisplay: Display;
  private textMover: Move;

  constructor(
    value: T,
    sphereGeometry: THREE.SphereGeometry,
    sphereMaterial: THREE.Material,
    textMaterial: THREE.Material,
    textGeometryParameters: TextGeometryParameters,
    scene: THREE.Scene
  ) {
    super(sphereGeometry, sphereMaterial, scene);
    this.value = value;
    const textGeometry = new TextGeometry(value + '', textGeometryParameters);
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    this.textPosition = new PositionImpl(textMesh);
    this.textMover = new MoveImpl(textMesh);
    this.textDisplay = new DisplayImpl(scene, textMesh);
  }

  async move(position: Position, duration: number, onUpdate?: () => void) {
    const distance = super.distance(position);
    const textEndPosition = calDestination(this.textPosition, distance);
    const sphereMove = super.move(position, duration, onUpdate);
    const textMove = this.textMover.move(textEndPosition, duration, onUpdate);
    return Promise.all([sphereMove, textMove]).then(() => { });
  }

  show() {
    super.show();
    this.textDisplay.show();
  }

  hide() {
    super.hide();
    this.textDisplay.hide();
  }
}

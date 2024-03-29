import * as THREE from 'three';
import { TextGeometry, TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry';
import Color from '../../params/color.interface';
import ColorImpl from '../../three/color.class';
import Display from '../../params/displayer.interface';
import DisplayImpl from "../../three/displayer.class";
import Mover from '../../params/mover.interface';
import MoveImpl from "../../three/mover.class";
import Position from '../../params/position.interface';
import PositionImpl from "../../three/position.class"
import { TextSphere as ITextSphere } from "../text-sphere.interface";
import Sphere from './sphere';
import { calDestination } from '../../utils';

export default class TextSphere<T> extends Sphere implements ITextSphere<T> {

  private _value: T;
  private textDisplay: Display;
  private textMover: Mover;
  textColor: Color;
  textPosition: Position;

  private textGeometryParameters: TextGeometryParameters;
  private textMaterial: THREE.Material;
  private scene: THREE.Scene;

  constructor(
    value: T,
    sphereGeometry: THREE.SphereGeometry,
    sphereMaterial: THREE.Material,
    textMaterial: THREE.Material,
    textGeometryParameters: TextGeometryParameters,
    scene: THREE.Scene
  ) {
    super(sphereGeometry, sphereMaterial, scene);
    this._value = value;

    this.textGeometryParameters = textGeometryParameters;
    this.textMaterial = textMaterial;
    this.scene = scene;

    const textGeometry = new TextGeometry(value + '', this.textGeometryParameters);
    const textMesh = new THREE.Mesh(textGeometry, this.textMaterial);
    this.textPosition = new PositionImpl(textMesh);
    this.textMover = new MoveImpl(textMesh);
    this.textDisplay = new DisplayImpl(this.scene, textMesh);
    this.textColor = new ColorImpl(this.textMaterial);
  }

  get value(): T {
    return this._value;
  }

  set value(t: T) {
    const { x, y, z } = this.textPosition;
    this.textDisplay.hide();
    this.createTextMesh(t);
    this.textPosition.x = x;
    this.textPosition.y = y;
    this.textPosition.z = z;
    this._value = t;
    this.textDisplay.show();
  }

  private createTextMesh(value: T) {
    const textGeometry = new TextGeometry(value + '', this.textGeometryParameters);
    const textMesh = new THREE.Mesh(textGeometry, this.textMaterial);
    this.textPosition = new PositionImpl(textMesh);
    this.textMover = new MoveImpl(textMesh);
    this.textDisplay = new DisplayImpl(this.scene, textMesh);
    this.textColor = new ColorImpl(this.textMaterial);
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

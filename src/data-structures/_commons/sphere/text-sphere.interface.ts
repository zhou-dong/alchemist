import { Sphere } from './sphere.interface';
import Position from "../params/position.interface";
import Color from "../params/color.interface";

export type TextSphere<T> = Sphere & {
  value: T;
  textPosition: Position;
  textColor: Color;
};

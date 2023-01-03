import { Sphere } from './sphere';
import Position from "../params/position";
import Color from "../params/color";

export type TextSphere<T> = Sphere & {
  value: T;
  textPosition: Position;
  textColor: Color;
};

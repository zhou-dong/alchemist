import { Cube } from './cube';
import Position from "../params/position";

export type TextCube<T> = Cube & {
  value: T;
  textPosition: Position;
};

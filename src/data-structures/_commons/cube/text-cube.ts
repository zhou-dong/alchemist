import { Cube } from './cube';
import Position from "../position";

export type TextCube<T> = Cube & {
  value: T;
  textPosition: Position;
};

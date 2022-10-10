import { Cube } from './cube';

export type TextCube<T> = Cube & {
  value: T;

  textX: number;
  textY: number;
  textZ: number;
};

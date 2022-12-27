import Position from "../position";
import { Sphere } from './sphere';

export type TextSphere<T> = Sphere & {
  value: T;
  textPosition: Position;
};

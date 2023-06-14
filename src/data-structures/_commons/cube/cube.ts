import Mover from "../params/mover.interface";
import Display from "../params/displayer.interface";
import Position from "../params/position.interface";

export interface Cube extends Mover, Display {

  width: number;
  height: number;
  depth: number;

  position: Position;

}

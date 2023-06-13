import Mover from "../params/move.interface";
import Display from "../params/display.interface";
import Position from "../params/position.interface";

export interface Cube extends Mover, Display {

  width: number;
  height: number;
  depth: number;

  position: Position;

}

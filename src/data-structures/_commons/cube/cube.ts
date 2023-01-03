import Move from "../params/move";
import Display from "../params/display";
import Position from "../params/position";

export interface Cube extends Move, Display {

  width: number;
  height: number;
  depth: number;

  position: Position;

}

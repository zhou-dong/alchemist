import Move from "../move";
import Display from "../display";
import Position from "../position";

export interface Cube extends Move, Display {

  width: number;
  height: number;
  depth: number;

  position: Position;

}

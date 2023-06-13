import Mover from "../params/move.interface";
import Display from "../params/display.interface";
import Position from "../params/position.interface";
import Color from "../params/color.interface";

export interface Sphere extends Mover, Display {
    radius: number;
    center: Position;
    sphereColor: Color;
}

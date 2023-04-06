import Move from "../params/move.interface";
import Display from "../params/display.interface";
import Position from "../params/position.interface";
import Color from "../params/color.interface";

export interface Sphere extends Move, Display {
    radius: number;
    center: Position;
    sphereColor: Color;
}

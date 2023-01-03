import Move from "../params/move";
import Display from "../params/display";
import Position from "../params/position";
import Color from "../params/color";

export interface Sphere extends Move, Display {
    radius: number;
    center: Position;
    sphereColor: Color;
}

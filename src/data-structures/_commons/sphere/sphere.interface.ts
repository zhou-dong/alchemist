import Mover from "../params/mover.interface";
import Display from "../params/displayer.interface";
import Position from "../params/position.interface";
import Color from "../params/color.interface";

export interface Sphere extends Mover, Display {
    radius: number;
    center: Position;
    sphereColor: Color;
}

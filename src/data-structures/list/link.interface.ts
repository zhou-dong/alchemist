import Color from "../_commons/params/color.interface";
import Displayer from "../_commons/params/displayer.interface";
import Position from "../_commons/params/position.interface";

export interface Link extends Displayer, Color {
    source: Position;
    target: Position;
    refresh(): void;
}

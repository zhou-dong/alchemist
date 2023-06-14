import Color from "../../_commons/params/color.interface";
import Displayer from "../../_commons/params/displayer.interface";
import Mover from "../../_commons/params/mover.interface";
import Position from "../../_commons/params/position.interface";

export default interface Text<T> extends Position, Mover, Displayer, Color {
    value: T;
}

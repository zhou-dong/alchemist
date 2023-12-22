import Color from "../../_commons/params/color.interface";
import Displayer from "../../_commons/params/displayer.interface";
import Mover from "../../_commons/params/mover.interface";
import Position from "../../_commons/params/position.interface";

export interface LinkedListNode<T> extends Mover, Displayer, Color, Position {
    data: T;
    next?: LinkedListNode<T>;
    prev?: LinkedListNode<T>;
}

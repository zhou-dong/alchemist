import Displayer from "../../_commons/params/displayer.interface";
import Mover from "../../_commons/params/mover.interface";
import Position from "../../_commons/params/position.interface";

export interface DoublyLinkedListNode<T> extends Mover, Displayer, Position {
    data: T;
    next?: DoublyLinkedListNode<T>;
    prev?: DoublyLinkedListNode<T>;
}

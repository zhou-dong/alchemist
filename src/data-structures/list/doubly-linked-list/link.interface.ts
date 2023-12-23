import Color from "../../_commons/params/color.interface";
import Displayer from "../../_commons/params/displayer.interface";
import { DoublyLinkedListNode } from "./node.interface";

export interface Link<T> extends Displayer, Color {
    source: DoublyLinkedListNode<T>;
    target: DoublyLinkedListNode<T>;
    refresh(): void;
}

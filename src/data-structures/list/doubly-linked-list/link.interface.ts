import Color from "../../_commons/params/color.interface";
import Displayer from "../../_commons/params/displayer.interface";
import { LinkedListNode } from "./node.interface";

export interface Link<T> extends Displayer, Color {
    source: LinkedListNode<T>;
    target: LinkedListNode<T>;
    refresh(): void;
}

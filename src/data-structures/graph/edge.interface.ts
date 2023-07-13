import Color from "../_commons/params/color.interface";
import Displayer from "../_commons/params/displayer.interface";
import { GraphNode } from "./node.interface";

export interface GraphEdge<T> extends Displayer, Color {
    source: GraphNode<T>;
    target: GraphNode<T>;
    refresh(): void;
}

export interface DirectedGraphEdge<T> extends GraphEdge<T> {

}

export interface UndirectedGraphEdge<T> extends GraphEdge<T> {

}

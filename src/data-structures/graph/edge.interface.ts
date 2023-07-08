import Displayer from "../_commons/params/displayer.interface";
import Mover from "../_commons/params/mover.interface";
import { GraphNode } from "./node.interface";

export interface GraphEdge<T> extends Displayer {
    source: GraphNode<T>;
    target: GraphNode<T>;
    refresh(): void;
}

export interface DirectedGraphEdge<T> extends GraphEdge<T> {

}

export interface UndirectedGraphEdge<T> extends GraphEdge<T> {

}

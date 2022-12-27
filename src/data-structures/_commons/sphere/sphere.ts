import Move from "../move";
import Display from "../display";
import Position from "../position";

export interface Sphere extends Move, Display {
    radius: number;
    center: Position;
}

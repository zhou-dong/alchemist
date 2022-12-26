import Position from "./position";

export default interface Mover {
    move: (position: Position, duration: number) => Promise<void>;
}

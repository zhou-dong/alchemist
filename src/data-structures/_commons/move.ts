import Position from "./position";

export default interface Move {
    move: (position: Position, duration: number) => Promise<void>;
}

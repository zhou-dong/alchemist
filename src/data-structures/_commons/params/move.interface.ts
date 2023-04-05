import Position from "./position.interface";

export default interface Move {
    move: (position: Position, duration: number, onUpdate?: () => void) => Promise<void>;
}

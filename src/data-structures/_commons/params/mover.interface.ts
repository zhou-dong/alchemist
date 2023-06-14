import Position from "./position.interface";

export default interface Mover {
    move: (position: Position, duration: number, onUpdate?: () => void) => Promise<void>;
}

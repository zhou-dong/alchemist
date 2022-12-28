import gsap from 'gsap';
import IMover from "../move";
import Position from '../position';
import { wait } from "../utils";

export default class Move implements IMover {

    private mesh: THREE.Mesh;

    constructor(mesh: THREE.Mesh) {
        this.mesh = mesh;
    }

    move(position: Position, duration: number, onUpdate?: () => void): Promise<void> {
        gsap.to(this.mesh.position, { ...position, duration, onUpdate });
        return wait(duration);
    }
}

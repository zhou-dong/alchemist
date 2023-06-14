import gsap from 'gsap';
import IMover from "../params/mover.interface";
import Position from '../params/position.interface';
import { wait } from "../utils";

export default class Mover implements IMover {

    private mesh: THREE.Mesh;

    constructor(mesh: THREE.Mesh) {
        this.mesh = mesh;
    }

    move(position: Position, duration: number, onUpdate?: () => void): Promise<void> {
        gsap.to(this.mesh.position, { ...position, duration, onUpdate });
        return wait(duration);
    }
}

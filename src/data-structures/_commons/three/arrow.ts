import * as THREE from "three";

export default class Arrow extends THREE.ArrowHelper {

    private readonly headLength: number;
    private readonly headWidth: number;

    origin: THREE.Vector3;
    dest: THREE.Vector3;

    constructor(
        origin: THREE.Vector3,
        dest: THREE.Vector3,
        color: THREE.Color | string | number,
        headLength: number,
        headWidth: number
    ) {
        const direction = dest.clone().sub(origin);
        super(direction.clone().normalize(), origin, direction.length(), color, headLength, headWidth)

        this.origin = origin;
        this.dest = dest;
        this.headLength = headLength;
        this.headWidth = headWidth;
    }

    get direction(): THREE.Vector3 {
        return this.dest.clone().sub(this.origin);
    }

    public update(): void {
        this.position.copy(this.origin);
        this.setDirection(this.direction.normalize());
        this.setLength(this.direction.length(), this.headLength, this.headWidth);
    }
}

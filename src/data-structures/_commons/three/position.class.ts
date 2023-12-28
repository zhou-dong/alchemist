import IPosition from "../params/position.interface"

export default class Position implements IPosition {

    private mesh: THREE.Mesh;

    constructor(mesh: THREE.Mesh) {
        this.mesh = mesh;
    }

    public get x(): number {
        return this.mesh.position.x;
    }

    public set x(v: number) {
        this.mesh.position.setX(v);
    }

    public get y(): number {
        return this.mesh.position.y;
    }

    public set y(v: number) {
        this.mesh.position.setY(v);
    }

    public get z(): number {
        return this.mesh.position.z;
    }

    public set z(v: number) {
        this.mesh.position.setZ(v);
    }

}

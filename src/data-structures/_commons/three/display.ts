import IDisplay from "../params/displayer.interface";

export default class Display implements IDisplay {

    private scene: THREE.Scene;
    private mesh: THREE.Mesh;

    constructor(
        scene: THREE.Scene,
        mesh: THREE.Mesh
    ) {
        this.scene = scene;
        this.mesh = mesh;
    }

    show(): void {
        this.scene.add(this.mesh);
    }

    hide(): void {
        this.scene.remove(this.mesh);
    }
}

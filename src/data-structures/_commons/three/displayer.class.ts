import IDisplayer from "../params/displayer.interface";

export default class Displayer implements IDisplayer {

    private scene: THREE.Scene;
    private mesh: THREE.Object3D;

    constructor(
        scene: THREE.Scene,
        mesh: THREE.Object3D
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

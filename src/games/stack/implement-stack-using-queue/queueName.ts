import * as THREE from 'three';
import { TextGeometry, TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry';
import gsap from 'gsap';
import { font } from '../../../commons/three';
import { queueNameStyles } from "./queueStyles";

class QueueName {

    private mesh: THREE.Mesh;

    constructor(name: string, position: THREE.Vector3, scene: THREE.Scene) {
        const { color, size, height } = queueNameStyles;
        this.mesh = this.buildMesh(name, color, size, height);
        this.position = position;
        this.show(scene);
    }

    private buildMesh(
        name: string,
        color: string,
        size: number,
        height: number
    ) {
        const textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color });
        const textGeometryParameters: TextGeometryParameters = { font, size, height };
        const textGeometry = new TextGeometry(name, textGeometryParameters);
        return new THREE.Mesh(textGeometry, textMaterial);
    }

    get position(): THREE.Vector3 {
        return this.mesh.position;
    }

    private set position(position: THREE.Vector3) {
        const { x, y, z } = position;
        this.mesh.position.setX(x);
        this.mesh.position.setY(y);
        this.mesh.position.setZ(z);
    }

    move(position: THREE.Vector3, duration: number) {
        gsap.to(this.mesh.position, { ...position, duration });
    }

    private show(scene: THREE.Scene) {
        scene.add(this.mesh);
    }
}

export default QueueName;

import * as THREE from 'three';
import { TextGeometry, TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry';
import { font } from '../../../commons/three';
import { titleStyles } from "./styles";

class StackTitle {

    constructor(title: string, position: THREE.Vector3, scene: THREE.Scene) {
        const { color, size, height } = titleStyles;
        const mesh = this.buildMesh(title, color, size, height);
        this.setPosition(mesh, position);
        this.show(mesh, scene);
    }

    private buildMesh(
        title: string,
        color: string,
        size: number,
        height: number
    ) {
        const textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color });
        const textGeometryParameters: TextGeometryParameters = { font, size, height };
        const textGeometry = new TextGeometry(title, textGeometryParameters);
        return new THREE.Mesh(textGeometry, textMaterial);
    }

    private setPosition(mesh: THREE.Mesh, { x, y, z }: THREE.Vector3) {
        mesh.position.setX(x);
        mesh.position.setY(y);
        mesh.position.setZ(z);
    }

    private show(mesh: THREE.Mesh, scene: THREE.Scene) {
        scene.add(mesh);
    }
}

export default StackTitle;

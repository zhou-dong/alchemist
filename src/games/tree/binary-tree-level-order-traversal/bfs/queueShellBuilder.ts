import * as THREE from 'three';
import { Cube } from '../../../../data-structures/_commons/cube/three/cube';
import { nodeSize, shellMterial } from "../styles";

class QueueShellBuilder {

    private _scene: THREE.Scene;

    private _material: THREE.Material = shellMterial;
    private _geometry: THREE.BoxGeometry = new THREE.BoxGeometry(nodeSize.width, nodeSize.height, nodeSize.depth);
    private _position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    private _show: boolean = true;

    constructor(scene: THREE.Scene, show: boolean) {
        this._show = show;
        this._scene = scene;
    }

    position(x: number, y: number, z: number): QueueShellBuilder {
        this._position = new THREE.Vector3(x, y, z);
        return this;
    }

    material(material: THREE.Material): QueueShellBuilder {
        this._material = material;
        return this;
    }

    geometry(width: number, height: number, depth: number): QueueShellBuilder {
        this._geometry = new THREE.BoxGeometry(width, height, depth);
        return this;
    }

    build(): Cube {
        const item = new Cube(this._geometry, this._material, this._scene);
        item.width = nodeSize.width;
        item.height = nodeSize.height;
        item.depth = nodeSize.depth;
        this.setPosition(item);
        if (this._show) {
            item.show();
        }
        return item;
    }

    private setPosition(item: Cube): void {
        item.position.x = this._position.x;
        item.position.y = this._position.y;
        item.position.z = this._position.z;
    }
}

export default QueueShellBuilder;

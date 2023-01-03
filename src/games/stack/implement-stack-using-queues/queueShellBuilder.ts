import * as THREE from 'three';
import { Cube } from '../../../data-structures/_commons/cube/three/cube';
import { node, queue } from "./queueStyles";

class QueueShellBuilder {

    private _scene: THREE.Scene;

    private _material: THREE.Material = queue.material;
    private _geometry: THREE.BoxGeometry = new THREE.BoxGeometry(node.size.width, node.size.height, node.size.depth);
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

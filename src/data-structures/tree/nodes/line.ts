import * as THREE from 'three';
import Position from '../../_commons/params/position.interface';

class Line {

    private scene: THREE.Scene;
    private instance: THREE.Line;
    private _start: Position;
    private _end: Position;

    constructor(
        start: Position,
        end: Position,
        material: THREE.LineBasicMaterial,
        scene: THREE.Scene
    ) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
            this.buildThreePosition(start),
            this.buildThreePosition(end)
        ]);
        this.instance = new THREE.Line(geometry, material);
        this.scene = scene;
        this._start = start;
        this._end = end;
    }

    get start(): Position {
        return this._start;
    }

    get end(): Position {
        return this._end;
    }

    set start(position: Position) {
        this._start = position;
        this.update(position, 0, 1, 2);
    }

    set end(position: Position) {
        this._end = position;
        this.update(position, 3, 4, 5);
    }

    show() {
        this.scene.add(this.instance);
        return this;
    }

    hide() {
        this.scene.remove(this.instance);
        return this;
    }

    private update(position: Position, xIndex: number, yIndex: number, zIndex: number) {
        this.instance.geometry.attributes.position.needsUpdate = true;
        const positions = this.instance.geometry.attributes.position.array;
        const { x, y, z } = position;
        (positions[xIndex] as any) = x;
        (positions[yIndex] as any) = y;
        (positions[zIndex] as any) = z;
    }

    private buildThreePosition({ x, y, z }: Position): THREE.Vector3 {
        return new THREE.Vector3(x, y, z);
    }
}

export default Line;

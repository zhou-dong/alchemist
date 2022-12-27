import * as THREE from 'three';

import Display from '../../display';
import Move from '../../move';
import Position from '../../position';

import DisplayImpl from "../../three/display";
import MoveImpl from "../../three/move";
import PositionImpl from "../../three/position"

import { Sphere as ISphere } from "../sphere";
import { calDistance } from '../../utils';

export default class Sphere implements ISphere {

    center: Position;
    private display: Display;
    private mover: Move;
    private geometry: THREE.SphereGeometry;

    constructor(
        geometry: THREE.SphereGeometry,
        material: THREE.Material,
        scene: THREE.Scene
    ) {
        this.geometry = geometry;
        const mesh = new THREE.Mesh(geometry, material);
        this.display = new DisplayImpl(scene, mesh);
        this.center = new PositionImpl(mesh);
        this.mover = new MoveImpl(mesh);
    }

    move(position: Position, duration: number) {
        return this.mover.move(position, duration);
    }

    show() {
        this.display.show();
    }

    hide() {
        this.display.hide();
    }

    protected distance(position: Position): Position {
        return calDistance(this.center, position);
    }

    get radius() {
        return this.geometry.parameters.radius;
    }
}

import * as THREE from 'three';

import Color from '../../params/color';
import ColorImpl from '../../three/color';
import Display from '../../params/display';
import DisplayImpl from "../../three/display";
import Move from '../../params/move';
import MoveImpl from "../../three/move";
import Position from '../../params/position';
import PositionImpl from "../../three/position"

import { Sphere as ISphere } from "../sphere";
import { calDistance } from '../../utils';

export default class Sphere implements ISphere {

    center: Position;
    private display: Display;
    private mover: Move;
    private geometry: THREE.SphereGeometry;
    sphereColor: Color;

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
        this.sphereColor = new ColorImpl(material);
    }

    move(position: Position, duration: number, onUpdate?: () => void) {
        return this.mover.move(position, duration, onUpdate);
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

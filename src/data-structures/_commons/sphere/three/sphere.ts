import * as THREE from 'three';

import Color from '../../params/color.interface';
import ColorImpl from '../../three/color.class';
import Display from '../../params/displayer.interface';
import DisplayImpl from "../../three/displayer.class";
import Mover from '../../params/mover.interface';
import MoveImpl from "../../three/mover.class";
import Position from '../../params/position.interface';
import PositionImpl from "../../three/position.class"

import { Sphere as ISphere } from "../sphere.interface";
import { calDistance } from '../../utils';

export default class Sphere implements ISphere {

    center: Position;
    private display: Display;
    private mover: Mover;
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

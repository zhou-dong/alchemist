import * as THREE from 'three';
import { Stack as IStack, Shell } from "../../../../data-structures/stack/stack.three";
import Position from '../../../../data-structures/_commons/params/position.interface';
import Displayer from '../../../../data-structures/_commons/params/displayer.interface';
import DisplayerImpl from '../../../../data-structures/_commons/three/displayer.class';
import PositionImpl from '../../../../data-structures/_commons/three/position.class';
import Mover from '../../../../data-structures/_commons/params/mover.interface';
import MoverImpl from '../../../../data-structures/_commons/three/mover.class';
import Color from '../../../../data-structures/_commons/params/color.interface';
import ColorImpl from '../../../../data-structures/_commons/three/color.class';

class StackShell extends PositionImpl implements Shell, Mover, Displayer, Color {

    width: number;
    private displayer: Displayer;
    private mover: Mover;
    private readonly colour: Color;

    constructor(
        scene: THREE.Scene,
        geometry: THREE.BufferGeometry,
        material: THREE.Material,
        width: number
    ) {
        const mesh = new THREE.Mesh(geometry, material);
        super(mesh);
        this.width = width;
        this.colour = new ColorImpl(material);
        this.displayer = new DisplayerImpl(scene, mesh);
        this.mover = new MoverImpl(mesh);
    }

    setColor(color: string): Promise<void> {
        return this.colour.setColor(color);
    }

    get color(): string {
        return this.colour.color;
    }

    set color(c: string) {
        this.colour.color = c;
    }

    show() {
        this.displayer.show();
    }

    hide() {
        this.displayer.hide();
    }

    move(position: Position, duration: number, onUpdate?: (() => void) | undefined) {
        return this.mover.move(position, duration, onUpdate);
    }
}

export class Stack extends IStack {

    readonly shell: StackShell;

    constructor(
        scene: THREE.Scene,
        length: number,
        position: Position,
        duration: number,
        color: string,
        radius: number,
        opacity: number,
    ) {
        const width = radius * 2 * length;
        const height = radius * 2;
        const depth = radius * 2;
        const transparent: boolean = true;

        const material = new THREE.MeshBasicMaterial({ color, opacity, transparent });
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const shell = new StackShell(scene, geometry, material, width);
        super(shell, duration);
        this.shell = shell;
        const { x, y, z } = position;
        this.shell.x = x;
        this.shell.y = y;
        this.shell.z = z;
    }

}

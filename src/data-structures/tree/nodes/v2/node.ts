import Position from '../../../_commons/params/position.interface';
import { TextSphere } from '../../../_commons/sphere/text-sphere';

export default class TreeNode<T> {

    value: TextSphere<T>;
    index?: number;
    left?: TreeNode<T>;
    right?: TreeNode<T>;
    parent?: TreeNode<T>;

    constructor(value: TextSphere<T>, index?: number) {
        this.value = value;
        this.index = index;
    }

    set sphereColor(color: string) {
        this.value.sphereColor.setColor(color);
    }

    set textColor(color: string) {
        this.value.textColor.setColor(color);
    }

    move(distance: Position, duration: number, onUpdate?: () => void): Promise<void> {
        const x = this.value.center.x + distance.x;
        const y = this.value.center.y + distance.y;
        const z = this.value.center.z + distance.z;
        return this.moveTo({ x, y, z }, duration, onUpdate);
    }

    moveTo(dest: Position, duration: number, onUpdate?: () => void): Promise<void> {
        return this.value.move(dest, duration, onUpdate);
    }

    show() {
        this.value.show();
        return this;
    }

    hide() {
        this.value.hide();
        return this;
    }
}

import Color from "../_commons/params/color.interface";
import Displayer from "../_commons/params/displayer.interface";
import Mover from "../_commons/params/mover.interface";
import Position from "../_commons/params/position.interface";
import { calDistance, calDestination } from "../_commons/utils";

export interface Base {
    position: Position;
    color: Color;
}

export interface GraphSkin extends Mover, Displayer, Base {

}

export interface GraphText extends Mover, Displayer, Base {
    text: string;
}

export class GraphNode<T> implements Mover, Displayer {

    value: T;
    readonly id: number;
    readonly skin: GraphSkin;
    readonly text: GraphText;

    constructor(
        id: number,
        value: T,
        skin: GraphSkin,
        text: GraphText,
    ) {
        this.id = id;
        this.value = value;
        this.skin = skin;
        this.text = text;
    }

    show() {
        this.skin.show();
        this.text.show();
    }

    hide() {
        this.skin.hide();
        this.text.hide();
    }

    async move(position: Position, duration: number, onUpdate?: (() => void) | undefined) {
        const skinMove = this.skin.move(position, duration, onUpdate);
        const textMove = this.text.move(this.calTextDestination(position), duration);
        return Promise.all([skinMove, textMove]).then(() => { })
    }

    private calTextDestination(destination: Position): Position {
        const distance = calDistance(this.skin.position, destination);
        return calDestination(this.text.position, distance);
    }
}

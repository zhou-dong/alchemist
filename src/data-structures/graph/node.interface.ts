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

export default class GraphNode<T> implements Mover, Displayer {

    value: T;
    readonly id: string;
    readonly position: Position;
    readonly skinColor: Color;
    readonly textColor: Color;

    private readonly skin: GraphSkin;
    private readonly text: GraphText;

    constructor(
        id: string,
        value: T,
        skin: GraphSkin,
        text: GraphText,
    ) {
        this.id = id;
        this.value = value;
        this.skin = skin;
        this.text = text;
        this.position = this.skin.position;
        this.skinColor = this.skin.color;
        this.textColor = this.text.color;
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
        const distance = calDistance(this.position, destination);
        return calDestination(this.text.position, distance);
    }
}

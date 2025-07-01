import { Position } from './props/position';

type BaseObject = {
    id: string;
    type: string;
};

export type CircleProps = {
    radius: number;
    center: Position;
};

export type CircleObject = BaseObject & {
    type: 'circle';
};

export type LineProps = {
    start: Position;
    end: Position;
}

export type LineObject = BaseObject & {
    type: 'line';
};

export type SceneObject =
    | CircleObject
    | LineObject;

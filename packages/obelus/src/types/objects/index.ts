import { LineObject } from "./lineObject";

import { Position } from './props/position';
import { BaseObject } from './props/baseObject';

export type CircleProps = {
    radius: number;
    center: Position;
};

export type CircleObject = BaseObject & {
    type: 'circle';
};


export type SceneObject =
    | CircleObject
    | LineObject;

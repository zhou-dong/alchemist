import { Position } from './props/position';
import { BaseProps } from './props/baseProps'

export type CircleObject = BaseProps & {
    type: 'circle';
    radius: number;
    center: Position;
};

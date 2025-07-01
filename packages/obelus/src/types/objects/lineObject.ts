import { Position } from './props/position';
import { BaseProps } from './props/baseProps'

export type LineObject = BaseProps & {
    type: 'line';
    start: Position;
    end: Position;
};

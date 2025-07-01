import { Position } from './props/position';
import { BaseObject } from './props/baseObject';

export type LineProps = {
    start: Position;
    end: Position;
}

export type LineObject = BaseObject & {
    type: 'line';
};

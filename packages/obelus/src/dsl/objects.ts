import { CircleObject, CircleProps } from "../types/objects";
import { LineProps, LineObject } from '../types/objects/lineObject';

export function circle(id: string, props: CircleProps): CircleObject {
    return { id, type: 'circle', ...props };
}

export function line(id: string, props: LineProps): LineObject {
    return { id, type: 'line', ...props };
}

import { CircleObject, CircleProps } from '../types/objects/circleObject';

export function circle(id: string, props: CircleProps): CircleObject {
    return { id, type: 'circle', ...props };
}

import { CircleObject, CircleProps, GroupObject, LineObject, LineProps } from "../types/objects";

export function circle(id: string, props: CircleProps): CircleObject {
    return { id, type: 'circle', ...props };
}

export function line(id: string, props: LineProps): LineObject {
    return { id, type: 'line', ...props };
}

export function group(id: string, children: string[]): GroupObject {
    return { id, type: 'group', children };
}

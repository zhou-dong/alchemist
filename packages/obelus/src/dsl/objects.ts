import { CircleObject, CircleProps, GroupObject, LineObject, LineProps } from "../types/objects";

export function circle(id: string, props: CircleProps, visual?: Record<string, any>): CircleObject {
    return { id, type: 'circle', ...props, visual };
}

export function line(id: string, props: LineProps, visual?: Record<string, any>): LineObject {
    return { id, type: 'line', ...props, visual };
}

export function group(id: string, children: string[]): GroupObject {
    return { id, type: 'group', children };
}

import { LineProps, LineObject } from '../types/objects/lineObject';

export function line(id: string, props: LineProps): LineObject {
    return { id, type: 'line', ...props };
}

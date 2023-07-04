export default class Node<T> {

    id: string;
    label: string;
    value: T;
    x: number;
    y: number;
    z: number;

    constructor(id: string, label: string, value: T, x: number, y: number, z: number) {
        this.id = id;
        this.label = label;
        this.value = value;
        this.x = x;
        this.y = y;
        this.z = z;
    }

}

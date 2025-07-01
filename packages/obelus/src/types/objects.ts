type BaseObject = {
    id: string;
    type: string;
};

type Position = {
    x: number;
    y: number;
    z: number;
};

export type CircleProps = {
    radius: number;
    center: Position;
};

export type CircleObject = BaseObject & CircleProps & {
    type: 'circle';
};

export type LineProps = {
    start: Position;
    end: Position;
}

export type LineObject = BaseObject & LineProps & {
    type: 'line';
};

export type GroupObject = BaseObject & {
    type: 'group';
    children: string[];
};

export type SceneObject =
    | CircleObject
    | LineObject
    | GroupObject;

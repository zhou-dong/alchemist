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
    position: Position;
    radius: number;
    extra?: Record<string, any>;
};

export type CircleObject = BaseObject & CircleProps & {
    type: 'circle';
};

export type LineProps = {
    start: Position;
    end: Position;
    extra?: Record<string, any>;
};

export type LineObject = BaseObject & LineProps & {
    type: 'line';
};

export type GroupObject = BaseObject & {
    type: 'group';
    children: string[];
};


export type LatexProps = {
    position: Position;
    expression: string;
    extra?: Record<string, any>;
};

export type LatexObject = BaseObject & LatexProps & {
    type: 'latex';
};

export type SceneObject =
    | CircleObject
    | LineObject
    | GroupObject
    | LatexObject;

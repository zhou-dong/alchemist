export type Animatable<T> = {
    id: string;
    target: T;
};

export type AnimatableGroup = {
    id: string;
    type: 'group';
    children: string[];
};

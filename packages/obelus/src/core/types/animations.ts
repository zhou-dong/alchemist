export type AnimationLeafCommandKind =
    | 'moveTo'
    | 'fadeIn'
    | 'fadeOut'
    | 'rotate'
    | 'scale'
    | 'waitUntil';

export type AnimationGroupCommandKind =
    | "sequence"
    | "parallel";

export interface AnimationGroupCommand {
    kind: AnimationGroupCommandKind;
    steps: AnimationCommand[];
}

export interface AnimationLeafCommand {
    kind: AnimationLeafCommandKind;
    duration?: number;
    params?: Record<string, any>;
}

export type AnimationCommandKind = AnimationLeafCommandKind | AnimationGroupCommandKind;
export type AnimationCommand = AnimationGroupCommand | AnimationLeafCommand;

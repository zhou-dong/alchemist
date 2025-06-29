export const animationLeafKinds = [
    'moveTo',
    'fadeIn',
    'fadeOut',
    'rotate',
    'scale',
    'waitUntil'
] as const;
export type AnimationLeafCommandKind = typeof animationLeafKinds[number];

export const animationGroupKinds = ['sequence', 'parallel'] as const;
export type AnimationGroupCommandKind = typeof animationGroupKinds[number];

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

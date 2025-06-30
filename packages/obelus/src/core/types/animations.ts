export const MOVE_TO_COMMAND = 'moveTo' as const;
export const FADE_IN_COMMAND = 'fadeIn' as const;
export const FADE_OUT_COMMAND = 'fadeOut' as const;
export const ROTATE_COMMAND = 'rotate' as const;
export const SCALE_COMMAND = 'scale' as const;
export const WAIT_UNTIL_COMMAND = 'waitUntil' as const;

export const animationLeafKinds = [
    MOVE_TO_COMMAND,
    FADE_IN_COMMAND,
    FADE_OUT_COMMAND,
    ROTATE_COMMAND,
    SCALE_COMMAND,
    WAIT_UNTIL_COMMAND
] as const;

export const SEQUENCE_COMMAND = "sequence" as const;
export const PARALLEL_COMMAND = "parallel" as const;

export const animationGroupKinds = [
    SEQUENCE_COMMAND,
    PARALLEL_COMMAND
] as const;

export type AnimationLeafCommandKind = typeof animationLeafKinds[number];
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

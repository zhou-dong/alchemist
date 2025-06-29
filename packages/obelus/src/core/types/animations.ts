export const MOVE_TO_COMMAND = 'moveTo';
export const FADE_IN_COMMAND = 'fadeIn';
export const FADE_OUT_COMMAND = 'fadeOut';
export const ROTATE_COMMAND = 'rotate';
export const SCALE_COMMAND = 'scale';
export const WAIT_UNTIL_COMMAND = 'waitUntil';

export const animationLeafKinds = [
    MOVE_TO_COMMAND,
    FADE_IN_COMMAND,
    FADE_OUT_COMMAND,
    ROTATE_COMMAND,
    SCALE_COMMAND,
    WAIT_UNTIL_COMMAND
] as const;

export const SEQUENCE_COMMAND = "sequence";
export const PARALLEL_COMMAND = "parallel";

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

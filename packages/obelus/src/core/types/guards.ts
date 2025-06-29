import { z } from 'zod';
import { AnimationCommand, MOVE_TO_COMMAND, ROTATE_COMMAND, SCALE_COMMAND, WAIT_UNTIL_COMMAND } from './animations';

export const moveToParamsSchema = z.object({
    x: z.number(),
    y: z.number()
});

export const rotateParamsSchema = z.object({
    angle: z.number()
});

export const scaleParamsSchema = z.object({
    factor: z.number()
});

export const waitUntilParamsSchema = z.object({
    time: z.number()
});

export function isMoveToCommand(cmd: AnimationCommand): boolean {
    return cmd.kind === MOVE_TO_COMMAND && moveToParamsSchema.safeParse(cmd.params).success;
}

export function isRotateCommand(cmd: AnimationCommand): boolean {
    return cmd.kind === ROTATE_COMMAND && rotateParamsSchema.safeParse(cmd.params).success;
}

export function isScaleCommand(cmd: AnimationCommand): boolean {
    return cmd.kind === SCALE_COMMAND && scaleParamsSchema.safeParse(cmd.params).success;
}

export function isWaitUntilCommand(cmd: AnimationCommand): boolean {
    return cmd.kind === WAIT_UNTIL_COMMAND && waitUntilParamsSchema.safeParse(cmd.params).success;
}

// Fallback generic runtime check
export function isValidParams<T extends object>(schema: z.ZodSchema<T>, params: any): params is T {
    return schema.safeParse(params).success;
}

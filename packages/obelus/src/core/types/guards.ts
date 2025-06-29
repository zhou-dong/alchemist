import { z } from 'zod';
import { AnimationCommand } from './animations';

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
    return cmd.kind === 'moveTo' && moveToParamsSchema.safeParse(cmd.params).success;
}

export function isRotateCommand(cmd: AnimationCommand): boolean {
    return cmd.kind === 'rotate' && rotateParamsSchema.safeParse(cmd.params).success;
}

export function isScaleCommand(cmd: AnimationCommand): boolean {
    return cmd.kind === 'scale' && scaleParamsSchema.safeParse(cmd.params).success;
}

export function isWaitUntilCommand(cmd: AnimationCommand): boolean {
    return cmd.kind === 'waitUntil' && waitUntilParamsSchema.safeParse(cmd.params).success;
}

// Fallback generic runtime check
export function isValidParams<T extends object>(schema: z.ZodSchema<T>, params: any): params is T {
    return schema.safeParse(params).success;
}

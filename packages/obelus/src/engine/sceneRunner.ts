import { AnimationEngine, RenderableObject, SceneRenderer } from "../core/interfaces/interfaces";
import { AnimatableShape } from "../core/types/shapes";

export function runScene(
    canvas: HTMLCanvasElement,
    scene: AnimatableShape[],
    renderer: SceneRenderer,
    engine: AnimationEngine
): void {
    renderer.init(canvas);
    const renderables: RenderableObject[] = scene.map(shape => {
        const obj = renderer.addObject(shape);
        engine.animate(obj, shape.animations);
        return obj;
    });

    const maxDuration = getSceneDuration(scene);
    let startTime: number | null = null;
    let animationFrameId: number;

    function renderFrame(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        if (elapsed >= maxDuration) {
            renderer.renderFrame(maxDuration);
            cancelAnimationFrame(animationFrameId);
            return;
        }
        renderer.renderFrame(elapsed);
        animationFrameId = requestAnimationFrame(renderFrame);
    }

    animationFrameId = requestAnimationFrame(renderFrame);
}

function getSceneDuration(scene: AnimatableShape[]): number {
    const getDuration = (commands: any[]): number => {
        let time = 0;
        for (const cmd of commands) {
            switch (cmd.type) {
                case 'sequence': time += getDuration(cmd.steps); break;
                case 'parallel': time += Math.max(...cmd.steps.map(getDuration)); break;
                case 'delay': case 'fadeIn': case 'fadeOut': case 'rotate': case 'scale': case 'appear': case 'moveTo':
                    time += cmd.duration || 0; break;
                case 'waitUntil': time = Math.max(time, cmd.params.time); break;
            }
        }
        return time;
    };
    return Math.max(...scene.map(s => getDuration(s.animations)));
}
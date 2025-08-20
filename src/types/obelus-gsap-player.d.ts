declare module 'obelus-gsap-player' {
  export interface PlayableStep {
    play(): Promise<void>;
  }

  export function buildAnimateSteps(
    steps: any[],
    record: any,
    startAnimation: () => void,
    stopAnimation: () => void
  ): PlayableStep[];
}

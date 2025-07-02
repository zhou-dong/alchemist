export type AnimateProps = { duration: number } & Record<string, any>;

export type AnimatableEvent = {
    target: string;
    targetProps: Record<string, any>;
    animateProps: AnimateProps;
};

export type AnimateProps = { duration: number } & Record<string, any>;

export type AnimateEvent = {
    target: string;
    targetProps: Record<string, any>;
    animateProps: AnimateProps;
};

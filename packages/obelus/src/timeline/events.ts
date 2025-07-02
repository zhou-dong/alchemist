export type AnimateProps = { duration: number } & Record<string, any>;

export type TimelineEvent = {
    time: number;
    target: string;
    targetProps: Record<string, any>;
    animateProps: AnimateProps;
};

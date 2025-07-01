export type AnimateProps = { duration: number } & Record<string, any>;

export type AnimateEvent = {
    type: 'animate';
    time: number;
    target: string;
    targetProps: Record<string, any>;
    animateProps: AnimateProps;
};

export type TimelineEvent = AnimateEvent;

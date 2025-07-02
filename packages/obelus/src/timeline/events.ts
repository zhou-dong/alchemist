import { AnimatableEvent } from "../events";

export type TimelineEvent = AnimatableEvent & {
    time: number;
};

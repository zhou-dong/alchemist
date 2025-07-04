import { AnimateEvent } from "../shared/animateEvent";

export type TimelineEvent = AnimateEvent & {
    time: number;
};

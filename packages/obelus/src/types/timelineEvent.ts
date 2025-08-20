import { AnimateEvent } from "./animateEvent";

export type TimelineEvent = AnimateEvent & {
    time: number;
};

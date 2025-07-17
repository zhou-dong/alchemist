import { AnimateEvent } from "./animateEvent";

export type TimelineEvent<T> = AnimateEvent<T> & {
    time: number;
};

import { AnimateEvent } from "../events";

export type TimelineEvent = AnimateEvent & {
    time: number;
};

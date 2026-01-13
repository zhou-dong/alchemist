import { AnimateEvent } from "./animateEvent";
import { CallEvent } from "./callEvent";

type TimelineEventBase = {
    time: number;
};

export type AnimateTimelineEvent = TimelineEventBase & AnimateEvent;
export type CallTimelineEvent = TimelineEventBase & CallEvent;

export type TimelineEvent =
    | AnimateTimelineEvent
    | CallTimelineEvent;

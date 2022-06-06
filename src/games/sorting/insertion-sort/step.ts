import Container from "../commons/container";

export enum Action {
    Leave,
    Insert,
    Override
}

export type Step = {
    a: Container;
    action: Action;
    index?: number;
}

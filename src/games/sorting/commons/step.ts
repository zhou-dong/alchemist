import Container from "./container"

export type Step = {
    a: Container;
    b: Container;
    exchange: boolean;
    finished?: Container;
}

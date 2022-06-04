import Container from "../commons/container";

type Step = {
    a: Container;
    b: Container;
    exchange: boolean;
    finished?: Container;
}

export default Step;

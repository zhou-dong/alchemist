import { Step } from "@mui/material";
import Container from "./container"

type Step = {
    a: Container;
    b: Container;
    exchange: boolean;
    finished?: Container;
}

export default Step;

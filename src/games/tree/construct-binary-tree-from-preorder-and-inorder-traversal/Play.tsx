import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";

const rootColor = "success";
const leftColor = "warning";
const rightColor = "info";
const defaultColor = "inherit";

const PreorderDisplay = () => {
    const { inputOutput, index } = useAlgoContext();
    const { preorder, steps } = inputOutput;

    const step = steps[index];
    const preorderLeft = step ? step.preorderLeft : -1;
    const preorderRight = step ? step.preorderRight : -1;
    const leftTreeLength = step ? step.leftTreeLength : 0;

    const getColor = (i: number) => {
        if (i === preorderLeft) {
            return rootColor;
        }
        if (i > preorderLeft && i <= preorderLeft + leftTreeLength) {
            return leftColor;
        }
        if (i > preorderLeft + leftTreeLength && i <= preorderRight) {
            return rightColor;
        }
        return defaultColor;
    }

    return (
        <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
            {preorder.length > 0 && <Typography sx={{ width: "65px" }}>Preorder</Typography>}
            <ButtonGroup>
                {
                    preorder.map((value, i) => <Button
                        key={i}
                        sx={{ width: "50px", height: "50px" }}
                        color={getColor(i)}
                        variant="contained"
                    >
                        {value}
                    </Button>)
                }
            </ButtonGroup>
        </Stack>
    )
}

const InorderDisplay = () => {
    const { inputOutput, index } = useAlgoContext();
    const { inorder, steps } = inputOutput;

    const step = steps[index];
    const inorderLeft = step ? step.inorderLeft : -1;
    const inorderRight = step ? step.inorderRight : -1;
    const inorderRootIndex = step ? step.inorderRootIndex : -1;

    const getColor = (i: number) => {
        if (i === inorderRootIndex) {
            return rootColor;
        }
        if (i >= inorderLeft && i < inorderRootIndex) {
            return leftColor;
        }
        if (i > inorderRootIndex && i <= inorderRight) {
            return rightColor;
        }
        return defaultColor;
    }

    return (
        <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
            {inorder.length > 0 && <Typography sx={{ width: "65px" }}>Inorder</Typography>}
            <ButtonGroup>
                {
                    inorder.map((value, i) => <Button
                        key={i}
                        sx={{ width: "50px", height: "50px" }}
                        color={getColor(i)}
                        variant="contained"
                    >
                        {value}
                    </Button>)
                }
            </ButtonGroup>
        </Stack>
    )
}


const Next = () => {
    const { setIndex } = useAlgoContext();

    return (
        <Button onClick={() => {

            setIndex(i => i + 1);

        }}>
            Next
        </Button>
    )
}

const Main = () => {



    return (
        <Stack direction="column" style={{ justifyContent: "center", alignItems: "center", position: "fixed", width: "100%", top: "140px" }} spacing={2}>
            <PreorderDisplay />
            {/* <div /> */}
            <InorderDisplay />
            <Next />
        </Stack>
    )
}

export default Main;

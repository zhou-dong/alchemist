import { Button, ButtonGroup, Chip, Stack, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useAlgoContext } from "./AlgoContext";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { State } from './AlgoState';
import { Action, Target } from './algo';

const Actions = styled(Stack)(() => ({
    position: "fixed",
    top: "15%",
    left: "50%",
    transform: "translate(-50%)",
    alignItems: "center"
}));

const DisplayInput = () => {
    const { index, input, steps, k } = useAlgoContext();
    const current = steps[index] ? steps[index].index : 0;

    return (
        <Stack direction="column">
            <Typography>Nums</Typography>
            <ButtonGroup color="success">
                {
                    input.map((num, i) =>
                        <Button
                            value={i}
                            key={i}
                            sx={{ height: 45, width: 45, borderColor: "gray" }}
                            variant={(i === current) ? "contained" : "outlined"}
                        >
                            {num}
                        </Button>
                    )
                }
            </ButtonGroup>
            <ButtonGroup>
                {
                    input.map((_, i) =>
                        <Button
                            value={i}
                            key={i}
                            sx={{ height: 25, width: 45, border: "none" }}
                            variant={(i + k > current && i <= current) ? "contained" : "outlined"}
                        >
                            {i}
                        </Button>
                    )
                }
            </ButtonGroup>
        </Stack>
    );
};

const DisplayDeque = () => {
    const { index, steps } = useAlgoContext();
    const deque = (steps[index]) ? steps[index].deque : [];
    return (
        <Stack>
            <Typography>Deque</Typography>
            <ButtonGroup size='large'>
                <Button sx={{ textTransform: 'lowercase', height: 45, width: 55, color: "#000", borderColor: "lightgray" }}>value</Button>
                {
                    deque.map((item, i) =>
                        <Button key={i} sx={{ height: 45, width: 45, borderColor: "lightgray" }}>
                            {item.value}
                        </Button>
                    )
                }
            </ButtonGroup>
            <ButtonGroup size='large'>
                <Button sx={{ textTransform: 'lowercase', border: "none", height: 25, width: 55, color: "#000" }}>
                    index
                </Button>
                {
                    deque.map((item, i) =>
                        <Button
                            key={i}
                            sx={{ border: "none", height: 25, width: 45, color: "#000" }}
                        >
                            {item.index}
                        </Button>
                    )
                }
            </ButtonGroup>
        </Stack>
    );
};

const DisplayResult = () => {
    const { index, steps } = useAlgoContext();
    const i = (index >= steps.length) ? steps.length - 1 : index;
    const result = steps[i]?.result || [];
    return (
        <Stack>
            <Typography>Result</Typography>
            <ButtonGroup size='large' color='success' variant='contained'>
                {
                    result.map((item, i) =>
                        <Button key={i}>
                            <Typography>
                                {item}
                            </Typography>
                        </Button>
                    )
                }
            </ButtonGroup>
        </Stack>
    );
}

const PopFromDeque = () => {
    const { setIndex, steps, index } = useAlgoContext();
    const step = steps[index];
    const disabled: boolean = step?.action !== Action.POP;

    const handleClick = () => {
        setIndex(i => i + 1);
    }

    return (
        <Button startIcon={<RemoveCircleOutlineOutlinedIcon />} onClick={handleClick} disabled={disabled}>pop from deque</Button>
    );
}

const PushToDeque = () => {

    const { setIndex, steps, index } = useAlgoContext();
    const step = steps[index];
    const enabled: boolean = step?.action === Action.PUSH && step?.target === Target.DEQUE;

    const handleClick = () => {
        setIndex(i => i + 1);
    }

    return (
        <Button startIcon={<AddCircleOutlineOutlinedIcon />} onClick={handleClick} disabled={!enabled}>push to deque</Button>
    );
}

const PushToResult = () => {

    const { setIndex, steps, index, setState } = useAlgoContext();
    const step = steps[index];
    const enabled: boolean = step?.action === Action.PUSH && step?.target === Target.RESULT;

    const handleClick = () => {
        if (index + 2 === steps.length) {
            setState(State.Finished);
        }
        setIndex(i => i + 1);
    }

    return (
        <Button startIcon={<AddCircleOutlineOutlinedIcon />} onClick={handleClick} disabled={!enabled}>push to result</Button>
    );
}

const ShiftFromDeque = () => {

    const { setIndex, steps, index } = useAlgoContext();
    const step = steps[index];
    const enabled: boolean = step?.action === Action.SHIFT;

    const handleClick = () => {
        setIndex(i => i + 1);
    }

    return (
        <Button endIcon={<RemoveCircleOutlineOutlinedIcon />} onClick={handleClick} disabled={!enabled}>shift from deque</Button>
    );
}

const Main = () => {
    const { state, k } = useAlgoContext();
    return (
        <Actions direction="column" spacing={5}>
            <Chip label={`K: ${k}`} variant="outlined" />
            <DisplayInput />
            <DisplayDeque />
            <DisplayResult />

            <ButtonGroup
                orientation="vertical"
                variant="contained"
                size="large"
                disabled={state !== State.Playing}
            >
                <PopFromDeque />
                <PushToDeque />
                <PushToResult />
                <ShiftFromDeque />
            </ButtonGroup>
        </Actions>
    );
}

export default Main;

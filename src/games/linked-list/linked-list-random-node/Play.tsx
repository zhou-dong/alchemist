import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import { Button, MobileStepper, Stack } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../data-structures/_commons/utils';
import { State } from './AlgoState';
import { skinDefaultColor } from './styles';
import { LinkedListNode } from '../../../data-structures/list/linked-list/node.three';
import { buildSteps, Step } from './stepsBuilder';
import Code from "./Code";
import { safeRun } from '../../commons/utils';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';

const skinEnabledColor = "blue";
const skinResultColor = "orange";

const MainPosition = styled("div")({
    position: "fixed",
    bottom: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
});

const resetListColor = (head: LinkedListNode<number> | undefined) => {
    const set: Set<LinkedListNode<number>> = new Set();
    let current: LinkedListNode<number> | undefined = head;
    while (current && !set.has(current)) {
        set.add(current);
        current.nodeSkin.color = skinDefaultColor;
        current = current.next
    }
}

const enableColor = (node: LinkedListNode<number> | undefined, color: string) => {
    if (node) {
        node.nodeSkin.color = color;
    }
}

const Stepper = () => {
    const { animate, cancelAnimate, head, setIndex, steps, index } = useAlgoContext();

    const step = steps[index - 1];

    resetListColor(head);
    enableColor(step?.result, skinResultColor);
    enableColor(step?.current, skinEnabledColor);

    const handleNext = async () => {
        setIndex(i => i + 1);
        await safeRun(() => wait(0.5), animate, cancelAnimate);
    };

    const handleBack = async () => {
        setIndex(i => i - 1);
        await safeRun(() => wait(0.5), animate, cancelAnimate);
    };

    return (
        <MobileStepper
            variant="dots"
            steps={steps.length + 1}
            activeStep={index}
            position="static"
            nextButton={
                <Button
                    size="large"
                    onClick={handleNext}
                    disabled={index === steps.length}
                >
                    Next
                    <KeyboardArrowRight />
                </Button>
            }
            backButton={
                <Button
                    size="large"
                    onClick={handleBack}
                    disabled={index === 0}>
                    <KeyboardArrowLeft />
                    Back
                </Button>
            }
        />
    )
}

const Play = () => {

    const {
        animate,
        cancelAnimate,
        head,
        state,
        setState,
        displayCode,
        steps,
        setSteps,
        setIndex,
        index
    } = useAlgoContext();

    const executeStep = async (step: Step) => {
        const { current, result } = step;
        resetListColor(head);
        enableColor(result, skinResultColor);
        enableColor(current, skinEnabledColor);
        await safeRun(() => wait(0.5), animate, cancelAnimate);
    }

    const getRandom = async () => {
        setState(State.Typing);
        const steps = (head === undefined) ? [] : buildSteps(head);
        setIndex(0);
        setSteps(steps);
        setState(State.Playing);
    }

    const disabled = state !== State.Playing || head === undefined;

    const handlePlay = async () => {
        setState(State.Typing);
        for (let i = index; i < steps.length; i++) {
            setIndex(i);
            const step = steps[i];
            await executeStep(step);
        }
        setIndex(i => i + 1);
        setState(State.Playing);
    }

    return (
        <>
            <MainPosition>
                <Stack direction="column" spacing={2} sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <Stepper />

                    <Button
                        sx={{ zIndex: 3 }}
                        variant='outlined'
                        color='success'
                        size="large"
                        endIcon={<PlayCircleOutlinedIcon />}
                        disabled={disabled || steps.length === 0 || index === steps.length}
                        onClick={handlePlay}
                    >
                        play
                    </Button>

                    <Button
                        sx={{ zIndex: 3 }}
                        onClick={getRandom}
                        startIcon={state === State.Finished ? <CheckIcon /> : <ShuffleIcon />}
                        disabled={disabled}
                        size="large"
                        variant='outlined'
                        color='success'
                    >
                        Get Random
                    </Button>
                </Stack>
            </MainPosition>
            {displayCode && <Code />}
        </>
    );
}

export default Play;

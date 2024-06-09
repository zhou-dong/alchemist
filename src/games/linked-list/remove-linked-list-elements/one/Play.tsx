import { styled } from '@mui/system';
import MouseIcon from '@mui/icons-material/Mouse';
import CheckIcon from '@mui/icons-material/Check';
import { Button, ButtonGroup } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../../data-structures/_commons/utils';
import { State } from '../AlgoState';
import { duration, radius, skinDisabledColor, skinEnabledColor, skinPostOrderColor, skinPreOrderColor } from '../styles';
import Code from './Code';
import { Action, Step } from './stepsBuilder';
import { safeRun } from '../../../commons/utils';

const MainPosition = styled("div")({
    position: "fixed",
    bottom: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
});

const Play = () => {
    const { animate, cancelAnimate, state, setState, index, setIndex, displayCode, steps } = useAlgoContext();

    const execute = async ({ action, head, newNext }: Step) => {
        switch (action) {
            case Action.return_null: {
                break;
            }
            case Action.recursive: {
                head?.nodeSkin.setColor(skinPreOrderColor);
                break;
            }
            case Action.found_next: {
                head?.nodeSkin.setColor(skinEnabledColor);
                break;
            }
            case Action.head_next_to_next: {
                const next = head?.next;

                if (next && next !== newNext) {
                    const { x, y, z } = next;
                    await next.move({ x, y: y - 2 * radius, z }, duration, () => {
                        head.linkToNext?.refresh();
                        next.linkToNext?.refresh();
                    });
                    next.nodeSkin.setColor(skinDisabledColor);
                    next.linkToNext?.hide();
                }

                if (newNext) {
                    if (head && head.linkToNext) {
                        head.linkToNext.target = newNext;
                        head.linkToNext.refresh();
                    }
                } else {
                    head?.linkToNext?.hide();
                }

                if (head) {
                    head.next = newNext;
                }
                break;
            }
            case Action.return_head_next: {
                head?.nodeSkin.setColor(skinPostOrderColor);
                break;
            }
            case Action.return_head: {
                head?.nodeSkin.setColor(skinPostOrderColor);
                break;
            }
        }
    }

    const handleNextClick = async () => {
        setState(State.Typing);

        const step = steps[index];

        if (!step) return;

        await safeRun(() => execute(step), animate, cancelAnimate);
        await safeRun(() => wait(0.1), animate, cancelAnimate);

        const last = steps[steps.length - 1];
        if (step === last) {
            setState(State.Finished);
        } else {
            setState(State.Playing);
        }

        setIndex(i => i + 1);
    }


    return (
        <>
            <MainPosition>
                <ButtonGroup >
                    <Button
                        sx={{ zIndex: 3 }}
                        size='large'
                        onClick={handleNextClick} startIcon={state === State.Finished ? <CheckIcon /> : <MouseIcon />}
                        disabled={state !== State.Playing}
                        color='success'
                        variant='outlined'
                    >
                        Next
                    </Button>
                </ButtonGroup>
            </MainPosition>
            {displayCode && <Code />}
        </>
    );
}

export default Play;

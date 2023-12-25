import { styled } from '@mui/system';
import MergeIcon from '@mui/icons-material/Merge';
import { Button, ButtonGroup } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import React from 'react';
import { wait } from '../../../../data-structures/_commons/utils';
import { State } from './AlgoState';

const Position = styled("div")({
    position: "fixed",
    bottom: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
});

const Play = () => {
    const { animate, cancelAnimate, list1, list2, state, setState } = useAlgoContext();

    const push = async () => {
        if (!list1) {
            setState(State.Finished);
            return;
        }
        if (!list2) {
            setState(State.Finished);
            return;
        }

        try {
            animate();
            if (list1.data < list2.data) {

            } else {

            }
            await wait(0.1);
        } catch (error) {
            console.log(error);
        } finally {
            cancelAnimate();
        }
    }

    const disabled: boolean = state !== State.Playing

    return (
        <Position>

            <ButtonGroup size='large'>
                <Button onClick={push} startIcon={<MergeIcon />} disabled={disabled}>
                    merge
                </Button>
            </ButtonGroup>

        </Position>
    );
}

export default Play;

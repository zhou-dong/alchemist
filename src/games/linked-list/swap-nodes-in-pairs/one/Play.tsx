import { styled } from '@mui/system';
import MergeIcon from '@mui/icons-material/Merge';
import CheckIcon from '@mui/icons-material/Check';
import { Button, ButtonGroup } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../../data-structures/_commons/utils';
import { State } from '../AlgoState';
import { Order } from './algo';
import { SimpleLink } from '../../../../data-structures/list/link.three';
import { linkColor, skinDefaultColor, skinPostOrderColor, skinPreOrderColor } from '../styles';
import Position from "../../../../data-structures/_commons/params/position.interface";
import Code from './Code';
import { LinkedListNode } from '../../../../data-structures/list/linked-list/node.three';

const MainPosition = styled("div")({
    position: "fixed",
    bottom: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
});

const resetColor = (node: LinkedListNode<number> | undefined) => {
    if (node) {
        node.nodeSkin.color = skinDefaultColor;
        resetColor(node.next);
    }
}

const Play = () => {
    const { animate, cancelAnimate, state, setState, index, actions, setIndex, scene, displayCode, listHead } = useAlgoContext();

    const push = async () => {

        const action = actions[index];

        if (!action) {
            return;
        }

        const { head, next, order } = action;

        resetColor(listHead);

        if (order === Order.PreOrder) {
            if (head) {
                head.nodeSkin.color = skinPreOrderColor;
            }
            if (next) {
                next.nodeSkin.color = skinPreOrderColor;
            }
        } else if (order === Order.PostOrder) {
            if (head) {
                head.nodeSkin.color = skinPostOrderColor;
            }
            if (next) {
                next.nodeSkin.color = skinPostOrderColor;
            }
        } else {
            if (head) {
                head.nodeSkin.color = skinDefaultColor;
            }
            if (next) {
                next.nodeSkin.color = skinDefaultColor;
            }
        }

        console.log(index, action);

        try {
            animate();
            await wait(0.1);
        } catch (error) {
            console.log(error);
        } finally {
            cancelAnimate();
        }

        if (index === actions.length - 1) {
            setState(State.Finished);
        } else {
            setIndex(i => i + 1);
        }
    }

    return (
        <>
            <MainPosition>
                <ButtonGroup >
                    <Button
                        sx={{ zIndex: 3 }}
                        size='large'
                        onClick={push} startIcon={state === State.Finished ? <CheckIcon /> : <MergeIcon />}
                        disabled={state !== State.Playing}
                        color='success'
                        variant='outlined'
                    >
                        merge
                    </Button>
                </ButtonGroup>
            </MainPosition>
            {displayCode && <Code />}
        </>
    );
}

export default Play;

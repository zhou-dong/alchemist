import { styled } from '@mui/system';
import MergeIcon from '@mui/icons-material/Merge';
import CheckIcon from '@mui/icons-material/Check';
import { Button, ButtonGroup } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../../data-structures/_commons/utils';
import { State } from './AlgoState';
import { Connection, Order } from './code';
import { SimpleLink } from '../../../../data-structures/list/link.three';
import { linkColor, skinPostOrderColor, skinPreOrderColor } from '../styles';

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
    const { animate, cancelAnimate, state, setState, index, actions, setIndex, scene } = useAlgoContext();

    const push = async () => {

        const action = actions[index];

        if (!action) {
            return;
        }

        const { node1, node2, connection, order } = action;

        const connect1 = () => {
            if (node1 && node1.next) {
                if (node1.linkToNext) {
                    node1.linkToNext.target = node1.next;
                } else {
                    node1.linkToNext = new SimpleLink(node1, node1.next, scene, linkColor);
                    node1.linkToNext.show();
                }
                node1.linkToNext.refresh();
            }
        }

        const connect2 = () => {
            if (node2 && node2.next) {
                if (node2.linkToNext) {
                    node2.linkToNext.target = node2.next;
                } else {
                    node2.linkToNext = new SimpleLink(node2, node2.next, scene, linkColor);
                    node2.linkToNext.show();
                }
                node2.linkToNext.refresh();
            }
        }

        if (order === Order.PreOrder) {
            if (node1) {
                node1.nodeSkin.color = skinPreOrderColor;
            }
            if (node2) {
                node2.nodeSkin.color = skinPreOrderColor;
            }
        } else {
            if (node1) {
                node1.nodeSkin.color = skinPostOrderColor;
            }
            if (node2) {
                node2.nodeSkin.color = skinPostOrderColor;
            }
            switch (connection) {
                case Connection.None:
                    connect1();
                    connect2();
                    break;
                case Connection.One:
                    connect1();
                    break;
                case Connection.Two:
                    connect2();
                    break;
            }
        }

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

    const disabled: boolean = state !== State.Playing

    return (
        <>
            <Position>
                <ButtonGroup size='large'>
                    <Button onClick={push} startIcon={state === State.Finished ? <CheckIcon /> : <MergeIcon />} disabled={disabled}>
                        merge
                    </Button>
                </ButtonGroup>
            </Position>
        </>
    );
}

export default Play;

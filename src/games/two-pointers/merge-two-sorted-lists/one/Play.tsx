import { styled } from '@mui/system';
import MergeIcon from '@mui/icons-material/Merge';
import CheckIcon from '@mui/icons-material/Check';
import { Button, ButtonGroup } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../../data-structures/_commons/utils';
import { State } from '../AlgoState';
import { Connection, Order } from './algo';
import { SimpleLink } from '../../../../data-structures/list/link.three';
import { linkColor, skinPostOrderColor, skinPreOrderColor } from '../styles';
import Position from "../../../../data-structures/_commons/params/position.interface";
import Code from './Code';

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
    const { animate, cancelAnimate, state, setState, index, actions, setIndex, scene, displayCode } = useAlgoContext();

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

                    const adjustSource = ({ x, y, z }: Position): Position => {
                        const width = node1.width;
                        return { x: x + width / 2, y, z };
                    }

                    const adjustTarget = ({ x, y, z }: Position): Position => {
                        const width = node1.next?.width || 0;
                        return { x: x - width / 2, y, z };
                    }

                    node1.linkToNext = new SimpleLink(node1, adjustSource, node1.next, adjustTarget, scene, linkColor);
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
                    const adjustSource = ({ x, y, z }: Position): Position => {
                        const width = node2.width;
                        return { x: x + width / 2, y, z };
                    }

                    const adjustTarget = ({ x, y, z }: Position): Position => {
                        const width = node2.next?.width || 0;
                        return { x: x - width / 2, y, z };
                    }
                    node2.linkToNext = new SimpleLink(node2, adjustSource, node2.next, adjustTarget, scene, linkColor);
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

import { styled } from '@mui/system';
import { Button } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { useAlgoContext } from "./AlgoContext";
import { State } from "../AlgoState";
import { wait } from '../../../../data-structures/_commons/utils';
import { skinDefaultColor } from '../styles';
import Code from './Code';
import MouseIcon from '@mui/icons-material/Mouse';
import { LinkedListNode } from '../../../../data-structures/list/linked-list/node.three';
import { Action, skinDummyColor } from './algo';

const resetListColor = (head?: LinkedListNode<number>) => {
    let current: LinkedListNode<number> | undefined = head;
    while (current) {
        current.nodeSkin.color = skinDefaultColor;
        current = current.next
    }
}

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
    const { state, setState, animate, cancelAnimate, displayCode, setIndex, index, items } = useAlgoContext();

    const handleClick = async () => {

        setState(State.Typing);

        const item = items[index + 1];

        if (!item) {
            setState(State.Finished);
            return;
        }

        const { head, dummy, current, action } = item;
        resetListColor(head);

        if (current) {
            current.nodeSkin.color = "green";
        }

        if (action === Action.New_Dummy) {
            dummy?.show();
        }

        if (action === Action.Link_Dummy_Head) {
            dummy?.linkToNext?.show();
        }

        if (action !== Action.Set_Current_To_Dummy && dummy) {
            dummy.nodeSkin.color = skinDummyColor;
        }

        if (action === Action.Remove_Next) {
            if (current && current.next) {
                try {
                    const duration = 1.5;
                    const { x, y, z } = current.next

                    animate();
                    current.next.nodeSkin.color = "lightgray";
                    current.next.nodeText.color = "#000";
                    await current.next.move({ x, y: y - 2, z }, duration, () => {
                        current.linkToNext?.refresh();
                        current.next?.linkToNext?.refresh()
                    });
                    current.next.linkToNext?.hide();
                    current.next.hide();
                } catch (error) {
                    console.log(error);
                } finally {
                    cancelAnimate();
                }

                if (current.next.next) {
                    current.linkToNext!.target = current.next.next;
                    current.linkToNext?.refresh();
                } else {
                    current.linkToNext?.hide();
                }
            }
        }

        if (action === Action.Return_Head) {
            dummy?.hide();
            dummy?.linkToNext?.hide();
        }

        try {
            animate();
            await wait(0.1);
        } catch (error) {
            console.log(error);
        } finally {
            cancelAnimate();
        }


        const last = items[items.length - 1];
        if (item === last) {
            setState(State.Finished);
        } else {
            setState(State.Playing);
        }

        setIndex(i => i + 1);
    }

    return (
        <>
            <MainPosition>
                <Button
                    sx={{ zIndex: 3 }}
                    onClick={handleClick}
                    startIcon={state === State.Finished ? <CheckIcon /> : <MouseIcon />}
                    disabled={state !== State.Playing}
                    size="large"
                    variant='outlined'
                    color='success'
                >
                    Next
                </Button>
            </MainPosition>
            {displayCode && <Code />}
        </>
    );
}

export default Play;

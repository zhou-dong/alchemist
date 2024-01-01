import { styled } from '@mui/system';
import { Button } from "@mui/material";
import MergeIcon from '@mui/icons-material/Merge';
import CheckIcon from '@mui/icons-material/Check';
import { useAlgoContext } from "./AlgoContext";
import { State } from "../AlgoState";
import { wait } from '../../../../data-structures/_commons/utils';
import { SimpleLink } from '../../../../data-structures/list/link.three';
import { linkColor, skinPostOrderColor } from '../styles';
import Position from '../../../../data-structures/_commons/params/position.interface';
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
    const { scene, state, setState, node1, setNode1, setNode2, node2, current, setCurrent, setLinesToHighlight, animate, cancelAnimate, displayCode } = useAlgoContext();

    const disabled: boolean = state !== State.Playing;

    const handleMerge = async () => {

        if (!node1 && !node2) {
            setState(State.Finished);
            return;
        }

        if (node1 && node2) {
            if (node1.data < node2.data) {
                current.next = node1;
                setNode1(node1.next);

                setLinesToHighlight([7]);
            } else {
                current.next = node2;
                setNode2(node2.next);

                setLinesToHighlight([10]);
            }
            if (current && current.next) {
                setCurrent(current.next);
            }
        } else {
            current.next = !node1 ? node2 : node1;

            setLinesToHighlight([16]);
            setState(State.Finished);
        }

        if (current && current.next) {
            if (!current.linkToNext) {
                const adjustSource = ({ x, y, z }: Position): Position => {
                    const width = current.width;
                    return { x: x + width / 2, y, z };
                }

                const adjustTarget = ({ x, y, z }: Position): Position => {
                    const width = current.next?.width || 0;
                    return { x: x - width / 2, y, z };
                }
                current.linkToNext = new SimpleLink(current, adjustSource, current.next, adjustTarget, scene, linkColor);
                current.linkToNext.show();
            } else {
                current.linkToNext.target = current.next;
                current.linkToNext.refresh();
            }

            current.next.nodeSkin.color = skinPostOrderColor;
        }

        if (!current.next) {
            setState(State.Finished);
        }

        try {
            animate();
            await wait(0.1);
        } catch (error) {
            console.log(error);
        } finally {
            cancelAnimate();
        }
    }

    return (
        <>
            <MainPosition>
                <Button
                    onClick={handleMerge}
                    startIcon={state === State.Finished ? <CheckIcon /> : <MergeIcon />}
                    disabled={disabled}
                    size='large'
                    sx={{ zIndex: 1 }}
                >
                    merge
                </Button>
            </MainPosition>
            {displayCode && <Code />}
        </>
    );
}

export default Play;

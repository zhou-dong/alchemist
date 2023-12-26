import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Stack, TextField } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { LinkedList } from "../../../../data-structures/list/linked-list/list.three";
import { LinkedListNode } from "../../../../data-structures/list/linked-list/node.three";
import { clearScene } from "../../../../commons/three";
import { buildLinkedListNode, linkColor } from "../styles";
import { buildActions } from './code';

const buildTwoArraies = () => {

    const max = 20;
    const arrayLength = 6;

    const pool: number[] = [];
    for (let i = 0; i < max; i++) {
        pool.push(i);
    }

    const first: number[] = [];
    const second: number[] = [];

    for (let i = 0; i < arrayLength; i++) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        const selectedNumber = pool[randomIndex];
        first.push(selectedNumber);
        pool.splice(randomIndex, 1);
    }

    for (let i = 0; i < arrayLength; i++) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        const selectedNumber = pool[randomIndex];
        second.push(selectedNumber);
        pool.splice(randomIndex, 1);
    }

    first.sort((a, b) => a - b);
    second.sort((a, b) => a - b);

    return [first, second];
}

interface Props {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

const Submit: React.FC<{
    nums1: string,
    nums2: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ nums1, nums2, setAnchorEl }) => {

    const first: number[] = nums1.split(",").map(num => +num);
    const second: number[] = nums2.split(",").map(num => +num);

    const disabled = !nums1 || !nums2 || first.length === 0 || second.length === 0;

    const { setState, animate, cancelAnimate, scene, setList1, setList2, setActions, setIndex } = useAlgoContext();

    const handleSubmit = async () => {
        setState(State.Typing);
        setAnchorEl(null);
        clearScene(scene);

        const linkLength = 4;
        const duration = 1;

        const buildHead = (i: number, y: number): LinkedListNode<number> => {
            const textX = ((i + "").length === 1) ? -0.4 : -0.8;
            return buildLinkedListNode(scene, i, { x: -8, y, z: 0 }, { x: -8 + textX, y: y + 1, z: 0 })
        }

        const buildNode = (i: number): LinkedListNode<number> => {
            const textX = ((i + "").length === 1) ? -0.4 : -0.8;
            return buildLinkedListNode(scene, i, { x: 0, y: 0, z: 0 }, { x: textX, y: 1, z: 0 })
        }

        const buildList = async (array: number[], y: number): Promise<LinkedListNode<number>> => {
            const list = new LinkedList<number>(scene, duration, linkColor, linkLength);
            const head = buildHead(array[0], y);
            await list.push(head);
            for (let i = 1; i < array.length; i++) {
                await list.push(buildNode(array[i]));
            }
            return head;
        }

        try {
            animate();

            const head1 = await buildList(first, 8);
            const head2 = await buildList(second, 2);

            setList1(head1);
            setList2(head2);

            const actions = buildActions(head1, head2);
            setActions(actions);
        } catch (error) {
            console.error(error);
        } finally {
            cancelAnimate();
        }

        setIndex(0);
        setState(State.Playing);
    }

    return (
        <IconButton sx={{ p: '10px' }} aria-label="submit input" onClick={handleSubmit} disabled={disabled}>
            <OutputIcon />
        </IconButton>
    );
}

const Main = ({ setAnchorEl }: Props) => {

    const [nums1, setNums1] = React.useState("");
    const [nums2, setNums2] = React.useState("");

    const handleNums1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNums1(e.currentTarget.value);
    }

    const handleNums2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNums2(e.currentTarget.value);
    }

    const handleFresh = () => {
        const [first, second] = buildTwoArraies();
        setNums1(() => first.join(","));
        setNums2(() => second.join(","));
    }

    return (
        <Paper
            variant="elevation"
            elevation={8}
            sx={{
                p: '2px 4px',
                display: 'flex',
                width: 300,
                alignItems: "center"
            }}
        >
            <Stack sx={{ width: "100%", padding: 2 }} direction="column">
                <TextField fullWidth label='List1, seprate by ","' variant="standard" value={nums1} onChange={handleNums1Change} />
                <TextField fullWidth label='List2, seprate by ","' variant="standard" value={nums2} onChange={handleNums2Change} />
                <Stack direction="row" justifyContent="end">
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={handleFresh}>
                        <RefreshIcon />
                    </IconButton>
                    <Submit nums1={nums1} nums2={nums2} setAnchorEl={setAnchorEl} />
                </Stack>
            </Stack>
        </Paper>
    );
}

export default Main;

import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Divider, InputBase } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ClearIcon from '@mui/icons-material/Clear';
import { useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { clearScene } from "../../../commons/three";
import { buildLinkedListNode, buildList, center, getTail, linkColor, linkLength, skinDummyColor } from "./styles";
import { buildSteps } from './stepsBuilder';
import InputIcon from '@mui/icons-material/Input';
import { safeRun } from '../../commons/utils';
import { LinkedListNode } from '../../../data-structures/list/linked-list/node.three';
import Position from '../../../data-structures/_commons/params/position.interface';
import { SimpleLink } from '../../../data-structures/list/link.three';

export const buildLink = (scene: THREE.Scene, node: LinkedListNode<number | string>, next: LinkedListNode<number | string>): SimpleLink => {

    const adjustSource = ({ x, y, z }: Position): Position => {
        const width = node.width;
        return { x: x + width / 2, y, z };
    }

    const adjustTarget = ({ x, y, z }: Position): Position => {
        const width = next.width;
        return { x: x - width / 2, y, z };
    }

    return new SimpleLink(node, adjustSource, next, adjustTarget, scene, linkColor);
}

const buildPalindrome = (len: number): number[] => {
    const max = 12;
    const pool: number[] = [];
    for (let i = 0; i < max; i++) {
        pool.push(i);
    }

    const firstHalf: number[] = [];
    const half = Math.floor(len / 2);
    for (let i = 0; i < half; i++) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        const selectedNumber = pool[randomIndex];
        firstHalf.push(selectedNumber);
        pool.splice(randomIndex, 1);
    }

    const lastHalf: number[] = [...firstHalf].reverse();

    if (len % 2 !== 0) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        const selectedNumber = pool[randomIndex];
        firstHalf.push(selectedNumber);
        pool.splice(randomIndex, 1);
    }

    const palindrome = firstHalf.concat(lastHalf);
    if (Math.random() > 0.6) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        const selectedNumber = pool[randomIndex];

        const pIndex = Math.floor(Math.random() * palindrome.length);
        palindrome[pIndex] = selectedNumber;

        pool.splice(randomIndex, 1);
    }

    return palindrome;
}

interface Props {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const Submit: React.FC<{
    list: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ list, setAnchorEl }) => {

    const array: number[] = list.split(",").map(num => +num);
    const disabled = !list || !list.length;

    const { setState, animate, cancelAnimate, scene, setSteps, setIndex, setHead, setDummyHead } = useAlgoContext();

    const handleSubmit = async () => {
        setState(State.Typing);
        setAnchorEl(null);
        clearScene(scene);
        setSteps([]);
        setIndex(0);

        const init = async () => {
            const x = -8;
            const y = 7;
            const head = await buildList(scene, array, x + linkLength, y);

            const dummyHead = buildLinkedListNode<string | number>(
                scene,
                "DummyHead",
                "D",
                { x: -8, y: 7, z: 0 },
                { x: -8.3, y: 6.8, z: 0 }
            );

            const link = buildLink(scene, dummyHead, head);
            dummyHead.linkToNext = link;

            dummyHead.nodeSkin.setColor(skinDummyColor);
            dummyHead.next = head;

            setDummyHead(dummyHead);
            setHead(head);
            const tail = getTail(dummyHead);
            const steps = buildSteps(array);
            await center(dummyHead, dummyHead.x, tail.x);
            setSteps(steps);
        }

        await safeRun(init, animate, cancelAnimate);
        setState(State.Playing);
    }

    return (
        <IconButton sx={{ p: '10px' }} aria-label="submit input" onClick={handleSubmit} disabled={disabled}>
            <OutputIcon />
        </IconButton>
    );
}

const Main = ({ setAnchorEl }: Props) => {

    const length = () => Math.random() > 0.5 ? 10 : 9;

    const [list, setList] = React.useState(() => buildPalindrome(length()).join(","));

    const handleListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setList(e.currentTarget.value);
    }

    const handleFresh = () => {
        const list = buildPalindrome(length());
        setList(() => list.join(","));
    }

    const handleClear = () => {
        setList("");
    }

    return (
        <Paper
            variant="elevation"
            elevation={8}
            sx={{
                p: '2px 4px',
                display: 'flex',
                width: 420,
                alignItems: "center"
            }}
        >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
                <InputIcon />
            </IconButton>

            <InputBase
                sx={{ ml: 1, flex: 1, }}
                placeholder='list, seprate by ","'
                value={list}
                onChange={handleListChange}
            />

            <Divider sx={{ height: 28, m: 0.5, marginRight: 2 }} orientation="vertical" />

            <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleFresh}>
                <RefreshIcon />
            </IconButton>

            <IconButton
                type="button"
                sx={{ p: '10px' }}
                aria-label="clear"
                disabled={!list.length}
                onClick={handleClear}
            >
                <ClearIcon />
            </IconButton>

            <Submit list={list} setAnchorEl={setAnchorEl} />
        </Paper>
    );
}

export default Main;

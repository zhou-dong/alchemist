import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Stack, TextField } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { clearScene } from "../../../commons/three";
import { buildLinkedListNode, buildList, center, getTail, linkColor, linkLength, skinDummyColor } from "./styles";
import { buildSteps } from './stepsBuilder';
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

const buildTwoArraies = () => {
    const one: number[] = [];
    const two: number[] = [];
    const shared: number[] = [];

    const max = 20;
    const pool: number[] = [];
    for (let i = 0; i < max; i++) {
        pool.push(i);
    }

    const add = (target: number[]) => {
        const randomIndex = Math.floor(Math.random() * pool.length);
        const selectedNumber = pool[randomIndex];
        target.push(selectedNumber);
        pool.splice(randomIndex, 1);
    }

    const random = Math.floor(Math.random() * 6);
    for (let i = 0; i < random; i++) {
        add(shared);
    }

    const firstLength = Math.floor(Math.random() * 6) + 1;
    for (let i = 0; i < firstLength; i++) {
        add(one);
    }

    const secondLength = Math.floor(Math.random() * 6) + 1;
    for (let i = 0; i < secondLength; i++) {
        add(two);
    }

    return [one, two, shared];
}

interface Props {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const Submit: React.FC<{
    one: number[],
    two: number[],
    shared: number[],
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ one, two, shared, setAnchorEl }) => {

    const array: number[] = one;
    const disabled = !two || !two.length;

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

    const [one, setOne] = React.useState<number[]>([]);
    const [two, setTwo] = React.useState<number[]>([]);
    const [shared, setShared] = React.useState<number[]>([]);

    const handleOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const values = e.currentTarget.value.split(",").map(value => +value);
        setOne(values);
    }

    const handleTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const values = e.currentTarget.value.split(",").map(value => +value);
        setTwo(values);
    }

    const handleFresh = () => {
        const [one, two, shared] = buildTwoArraies();
        setOne(one);
        setTwo(two);
        setShared(shared);
    }

    return (
        <Paper
            variant="elevation"
            elevation={8}
            sx={{
                p: '2px 4px',
                display: 'flex',
                width: 320,
                alignItems: "center"
            }}
        >
            <Stack sx={{ width: "100%", padding: 2 }} direction="column">
                <TextField fullWidth label='List1, seprate by ","' variant="standard" value={one.concat(shared).join(",")} onChange={handleOneChange} />
                <TextField fullWidth label='List2, seprate by ","' variant="standard" value={two.concat(shared).join(",")} onChange={handleTwoChange} />
                <Stack direction="row" justifyContent="end">
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={handleFresh}>
                        <RefreshIcon />
                    </IconButton>
                    <Submit one={one} two={two} shared={shared} setAnchorEl={setAnchorEl} />
                </Stack>
            </Stack>
        </Paper>
    );
}

export default Main;

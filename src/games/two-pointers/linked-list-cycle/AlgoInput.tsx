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
import { buildList, findCycleBeginNode, findTail, linkColor } from "./styles";
import { buildItems } from './algo';
import InputIcon from '@mui/icons-material/Input';
import { recenter, updatePositions } from './circle';
import { SimpleLink } from '../../../data-structures/list/link.three';
import Position from '../../../data-structures/_commons/params/position.interface';
import { wait } from '../../../data-structures/_commons/utils';

const buildRandomList = (length: number): number[] => {
    const max = 20;

    const pool: number[] = [];
    for (let i = 0; i < max; i++) {
        pool.push(i);
    }

    const list: number[] = [];
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        const selectedNumber = pool[randomIndex];
        list.push(selectedNumber);
        pool.splice(randomIndex, 1);
    }

    const result = list.map(n => n + 1);
    result.sort((a, b) => a - b);
    return result;
}

interface Props {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

const Submit: React.FC<{
    list: string,
    pos: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ list, pos, setAnchorEl }) => {

    const disabled = !pos || !list || !list.length;
    const array: number[] = list.split(",").map(num => +num);

    const { setState, animate, cancelAnimate, scene, setItems, setIndex, setHead } = useAlgoContext();

    const handleSubmit = async () => {
        setState(State.Typing);
        setAnchorEl(null);
        clearScene(scene);
        setItems([]);
        setIndex(0);

        try {
            animate();
            const head = await buildList(scene, array, -11, 5);
            setHead(head);
            const tail = findTail(head);
            const beginNode = findCycleBeginNode(head, +pos);

            if (beginNode) {
                const adjustSource = (position: Position): Position => position;
                const adjustTarget = (position: Position): Position => position;
                tail.next = beginNode;
                tail.linkToNext = new SimpleLink(tail, adjustSource, beginNode, adjustTarget, scene, linkColor);
                tail.linkToNext.show();

                await updatePositions(beginNode);
                await recenter(head);
                await wait(0.2);
            }

            const items = buildItems(head);
            setItems(items);
        } catch (error) {
            console.error(error);
        } finally {
            cancelAnimate();
        }

        setState(State.Playing);
    }

    return (
        <IconButton sx={{ p: '10px' }} aria-label="submit input" onClick={handleSubmit} disabled={disabled}>
            <OutputIcon />
        </IconButton>
    );
}

const random = (max: number): number => {
    return Math.floor(Math.random() * max) + 1;
}

const Main = ({ setAnchorEl }: Props) => {

    const maxLength = 11;
    const [list, setList] = React.useState(() => buildRandomList(maxLength).join(","));
    const [pos, setPos] = React.useState<string>(() => random(5) + "");

    const handleListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setList(e.currentTarget.value);
    }

    const handlePosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPos(e.currentTarget.value);
    }

    const handleFresh = () => {
        const list = buildRandomList(maxLength);
        setList(() => list.join(","));
        setPos(() => random(list.length - 1) + "");
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

            <InputBase
                sx={{ width: 40 }}
                placeholder='pos'
                value={pos}
                onChange={handlePosChange}
                type="number"
            />

            <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleFresh}>
                <RefreshIcon />
            </IconButton>

            <IconButton
                type="button"
                sx={{ p: '10px' }}
                aria-label="clear"
                disabled={!list.length}
                onClick={() => {
                    setList("");
                }}
            >
                <ClearIcon />
            </IconButton>

            <Submit list={list} pos={pos} setAnchorEl={setAnchorEl} />
        </Paper>
    );
}

export default Main;

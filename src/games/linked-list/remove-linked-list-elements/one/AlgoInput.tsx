import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAlgoContext } from "./AlgoContext";
import { State } from '../AlgoState';
import { clearScene } from "../../../../commons/three";
import { buildList, center, getTail } from "../styles";
import InputIcon from '@mui/icons-material/Input';
import { Divider, InputBase } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { safeRun } from '../../../commons/utils';
import { buildSteps } from './stepsBuilder';

const buildRandomList = (length: number, max: number): number[] => {
    const list: number[] = [];
    for (let i = 0; i < length; i++) {
        const random = Math.floor(Math.random() * max) + 1;
        list.push(random);
    }
    return list;
}

interface Props {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

const Submit: React.FC<{
    list: string,
    num: number,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ list, num, setAnchorEl }) => {

    const array: number[] = list.split(",").map(num => +num);
    const disabled = !list || !list.length || num < 1;

    const { setState, animate, cancelAnimate, scene, setSteps, setIndex, setHead } = useAlgoContext();

    const handleSubmit = async () => {
        setState(State.Typing);
        setAnchorEl(null);
        clearScene(scene);
        setIndex(0);

        const init = async () => {
            const x = -8;
            const y = 7;
            const head = await buildList(scene, array, x, y);
            const tail = getTail(head);
            setHead(head);
            await center(head, head.x, tail.x);
            const steps = buildSteps(array, num);
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

const random = (max: number): number => {
    return Math.floor(Math.random() * max);
}

const Main = ({ setAnchorEl }: Props) => {
    const max = 20;

    const length = () => Math.random() > 0.5 ? 9 : 8;

    const [list, setList] = React.useState(() => buildRandomList(length(), max).join(","));
    const [num, setNum] = React.useState(() => random(19) + 1);

    const handleListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setList(e.currentTarget.value);
    }

    const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNum(+e.currentTarget.value);
    }

    const handleFresh = () => {
        const list = buildRandomList(length(), max);
        setList(() => list.join(","));
        setNum(() => random(19) + 1);
    }

    const handleClear = () => {
        setList("");
        setNum(0);
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
                sx={{ width: 35 }}
                placeholder='num'
                value={num}
                onChange={handleNumChange}
                type="number"
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

            <Submit list={list} num={num} setAnchorEl={setAnchorEl} />
        </Paper>
    );
}

export default Main;

import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Divider, InputBase } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ClearIcon from '@mui/icons-material/Clear';
import { useAlgoContext } from "./AlgoContext";
import { State } from '../AlgoState';
import { clearScene } from "../../../../commons/three";
import { buildList, duration, radius } from "../styles";
import InputIcon from '@mui/icons-material/Input';
import { buildItems } from './algo';
import { Stack } from './stack';

const listY = 9;
const stackY = 5;

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
    n: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ list, n, setAnchorEl }) => {

    const disabled = !n || !n.length || !+n || !list || !list.length;
    const array: number[] = list.split(",").map(num => +num);

    const { setState, animate, cancelAnimate, scene, setList, setN, setItems, setIndex, setStack, setPositionMap } = useAlgoContext();

    const calX = () => {
        switch (array.length) {
            case 5: return -7;
            case 6: return -9;
            default: return -11;
        }
    }

    const handleSubmit = async () => {
        setState(State.Typing);
        setAnchorEl(null);
        clearScene(scene);
        setIndex(0);
        setItems([]);
        setList(list);
        setN(+n);
        setPositionMap(new Map());

        try {
            animate();
            const head = await buildList(scene, array, calX(), listY);
            const items = buildItems(scene, head, array, +n);
            setItems(items);
            const stack = new Stack(scene, array.length + 1, { x: 0, y: stackY, z: 0 }, duration, "lightgray", radius, 0.3);
            setStack(stack);
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

const createInput = () => {
    const random = Math.floor(Math.random() * 3);
    const max = 5 + random;
    const list: number[] = buildRandomList(max);
    const n = Math.floor(Math.random() * max) + 1;
    return { inputList: list, inputN: n };
}

const Main = ({ setAnchorEl }: Props) => {

    const { inputList, inputN } = createInput();
    const [list, setList] = React.useState<string>(() => inputList.join(","));
    const [n, setN] = React.useState<string>(() => inputN + "");

    const handleListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setList(e.currentTarget.value);
    }

    const handleNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setN(e.currentTarget.value);
    }

    const handleFresh = () => {
        const { inputList, inputN } = createInput();
        setList(() => inputList.join(","));
        setN(() => inputN + "");
    }

    return (
        <Paper
            variant="elevation"
            elevation={8}
            sx={{
                p: '2px 4px',
                display: 'flex',
                width: 400,
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

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <InputBase
                sx={{ width: 50 }}
                placeholder='n'
                value={n}
                onChange={handleNChange}
                type="number"
            />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleFresh}>
                <RefreshIcon />
            </IconButton>

            <IconButton
                type="button"
                sx={{ p: '10px' }}
                aria-label="clear"
                disabled={!list.length && !n.length}
                onClick={() => {
                    setList("");
                    setN("");
                }}
            >
                <ClearIcon />
            </IconButton>

            <Submit list={list} n={n} setAnchorEl={setAnchorEl} />
        </Paper>
    );
}

export default Main;

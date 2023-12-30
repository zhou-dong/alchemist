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
import { buildList } from "../styles";
import InputIcon from '@mui/icons-material/Input';
import { buildItems } from './algo';

const arrayLength = 7;
const y = 9;

const buildRandomList = (): number[] => {
    const max = 20;

    const pool: number[] = [];
    for (let i = 0; i < max; i++) {
        pool.push(i);
    }

    const list: number[] = [];
    for (let i = 0; i < arrayLength; i++) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        const selectedNumber = pool[randomIndex];
        list.push(selectedNumber);
        pool.splice(randomIndex, 1);
    }

    list.sort((a, b) => a - b);

    return list;
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

    const { setState, animate, cancelAnimate, scene, setList, setN, setItems} = useAlgoContext();

    const handleSubmit = async () => {
        setState(State.Typing);
        setAnchorEl(null);
        clearScene(scene);

        setList(list);
        setN(+n);

        try {
            animate();
            const head = await buildList(scene, array, y);
            const items = buildItems(scene, head,+n);
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

const buildRandom = (max: number): string => {
    const random = Math.floor(Math.random() * arrayLength) + 1;
    return random + "";
}

const Main = ({ setAnchorEl }: Props) => {

    const [list, setList] = React.useState(() => buildRandomList().join(","));
    const [n, setN] = React.useState(() => buildRandom(arrayLength));

    const handleListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setList(e.currentTarget.value);
    }

    const handleNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setN(e.currentTarget.value);
    }

    const handleFresh = () => {
        const list = buildRandomList();
        setList(() => list.join(","));
        setN(() => buildRandom(arrayLength));
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

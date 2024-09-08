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
import { buildList, center, getTail, linkLength } from "./styles";
import { buildSteps } from './stepsBuilder';
import InputIcon from '@mui/icons-material/Input';
import { safeRun } from '../../commons/utils';

const buildInputs = (size: number): number[] => {
    const max = Math.max(20, size);

    const pool: number[] = [];
    for (let i = 0; i < max; i++) {
        pool.push(i);
    }

    const nums: number[] = []
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        const selectedNumber = pool[randomIndex];
        nums.push(selectedNumber + 1);
        pool.splice(randomIndex, 1);
    }
    return nums;
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

    const { setState, animate, cancelAnimate, scene, setSteps, setIndex } = useAlgoContext();

    const handleSubmit = async () => {
        setState(State.Typing);
        setAnchorEl(null);
        clearScene(scene);
        setSteps([]);
        setIndex(0);

        const init = async () => {
            const x = -8;
            const y = 8;
            const head = await buildList(scene, array, x + linkLength, y);
            const tail = getTail(head);
            const steps = buildSteps(head, scene);
            await center(head, head.x, tail.x);
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

    const length = () => 5 + Math.floor(Math.random() * 4);

    const [list, setList] = React.useState(() => buildInputs(length()).join(","));

    const handleListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setList(e.currentTarget.value);
    }

    const handleFresh = () => {
        const list = buildInputs(length());
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

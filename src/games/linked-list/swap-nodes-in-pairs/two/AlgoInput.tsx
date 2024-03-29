import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import InputIcon from '@mui/icons-material/Input';
import Paper from '@mui/material/Paper';
import { InputBase } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAlgoContext } from "./AlgoContext";
import { State } from '../AlgoState';
import { clearScene } from "../../../../commons/three";
import { buildList, center, linkLength } from "../styles";
import { buildSteps } from './algo';
import ClearIcon from '@mui/icons-material/Clear';
import { wait } from '../../../../data-structures/_commons/utils';
import { safeRun } from '../../../commons/utils';
import { SimpleLinkedListNodeText } from '../../../../data-structures/list/list-node-base';

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
    return result;
}

interface Props {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

const buildText = (text: string, scene: THREE.Scene) => {
    return new SimpleLinkedListNodeText(text, scene, "green", 0.5, 0.1);
}

const Submit: React.FC<{
    list: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ list, setAnchorEl }) => {

    const nums: number[] = list.split(",").map(num => +num);

    const disabled = !list || nums.length === 0;

    const { setState, animate, cancelAnimate, scene, setIndex, setSteps, setCurrentText, setAText, setBText } = useAlgoContext();

    const handleSubmit = async () => {
        setState(State.Typing);
        setAnchorEl(null);
        clearScene(scene);
        setSteps([]);
        setIndex(0);

        const init = async () => {
            const x = -8;
            const y = 7;
            const head = await buildList(scene, nums, x, y);

            const steps = buildSteps(head, scene, x - linkLength, y);
            await center(steps[0].dummy);
            await wait(0.1);
            setSteps(steps);

            setCurrentText(buildText("c", scene));
            setAText(buildText("a", scene));
            setBText(buildText("b", scene));
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

    const listLength = (): number => {
        const random = Math.random();
        return random > 0.5 ? 7 : 6;
    }

    const [list, setList] = React.useState(() => buildRandomList(listLength()).join(","));

    const handleListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setList(e.currentTarget.value);
    }

    const handleFresh = () => {
        setList(() => buildRandomList(listLength()).join(","));
    }

    return (
        <Paper
            variant="elevation"
            elevation={8}
            sx={{
                p: '2px 4px',
                display: 'flex',
                width: 360,
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

            <Submit list={list} setAnchorEl={setAnchorEl} />
        </Paper>
    );
}

export default Main;

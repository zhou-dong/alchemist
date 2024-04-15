import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import InputIcon from '@mui/icons-material/Input';
import Paper from '@mui/material/Paper';
import { Divider, InputBase } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { clearScene } from "../../../commons/three";
import { buildList, center, getTail, linkLength } from "./styles";
import ClearIcon from '@mui/icons-material/Clear';
import { wait } from '../../../data-structures/_commons/utils';
import { safeRun } from '../../commons/utils';
import { buildSteps } from './stepsBuilder';
import { buildDummyNode } from './nodeBuilder';

const maxNum = 10;

const buildRandomList = (length: number): number[] => {
    const list: number[] = [];
    for (let i = 0; i < length; i++) {
        const random = Math.floor(Math.random() * maxNum) + 1;
        list.push(random);
    }

    const result = list.map(n => n + 1);
    // result.sort((a, b) => a - b);
    return result;
}

const buildRandomX = (): string => {
    const random = Math.floor(Math.random() * maxNum) + 1;
    return random + "";
}

interface Props {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

const Submit: React.FC<{
    list: string,
    x: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ list, x, setAnchorEl }) => {

    const nums: number[] = list.split(",").map(num => +num);

    const disabled = !list || nums.length === 0 || !x;
    const num = +x;

    const { setState, animate, cancelAnimate, scene, setIndex, setSteps, setX, setSmallDummy, setLargeDummy, setHead } = useAlgoContext();

    const handleSubmit = async () => {
        setState(State.Typing);
        setAnchorEl(null);
        clearScene(scene);
        setIndex(0);
        setX(+x);

        const init = async () => {
            const x = -8;
            const y = 7;
            const head = await buildList(scene, nums, x, y);
            const tail = getTail(head);
            await center(head, x - linkLength, tail.x);

            const smallDummy = buildDummyNode(scene, "S", head.x - linkLength, y - 5);
            const largeDummy = buildDummyNode(scene, "L", head.x - linkLength, y - 5 - 5);

            setHead(head);
            setSmallDummy(smallDummy);
            setLargeDummy(largeDummy);

            const steps = buildSteps(nums, num);
            await wait(0.05);
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

    const listLength = (): number => {
        const random = Math.random();
        return random > 0.5 ? 7 : 6;
    }

    const [list, setList] = React.useState(() => buildRandomList(listLength()).join(","));
    const [x, setX] = React.useState(() => buildRandomX());

    const handleListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setList(e.currentTarget.value);
    }

    const handleXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setX(e.currentTarget.value);
    }

    const handleFresh = () => {
        setList(() => buildRandomList(listLength()).join(","));
        setX(() => buildRandomX());
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

            <Divider sx={{ height: 28, m: 0.5, marginRight: 2 }} orientation="vertical" />

            <InputBase
                sx={{ width: 40 }}
                placeholder='k'
                value={x}
                onChange={handleXChange}
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

            <Submit x={x} list={list} setAnchorEl={setAnchorEl} />
        </Paper>
    );
}

export default Main;
